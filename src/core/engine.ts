/**
 * 任务执行引擎
 *
 * 负责任务的调度和引擎状态管理，不直接操作 Step。
 * 步骤执行逻辑已下沉到 Task（BaseTask.run()），Engine 只负责：
 *   - 引擎状态管理（运行/暂停/停止）
 *   - 创建 IEngineControl 注入到 Task，让 Task 感知引擎状态
 *   - 任务链调度（顺序执行、失败后恢复并继续）
 *
 * 执行层次：
 *   runTaskChain() → run() → task.run(ctx, startStep, control)
 *
 * 分层职责：
 *   Engine：调度 + 状态管理 + 弹窗处理委托
 *   Task：步骤循环 + 恢复策略 + 步骤跳转
 *   Step：单步执行（action + confirm + 重试）
 */

import { ICtx, IEngineControl, ITask } from "./step";
import { guardScriptInterrupt } from "../utils/script_guard";

// ============================================================
//  执行上下文
// ============================================================

/**
 * 创建执行上下文
 *
 * ICtx 在整个任务链中共享，用于在步骤之间传递状态：
 *   - cfg:    全局配置（由 UI 传入或默认值）
 *   - task.current:  当前正在执行的步骤名称
 *   - task.attempts: 每个步骤成功时消耗的重试次数记录
 *   - task.data:     步骤间共享数据（如剩余次数、购买结果等）
 *
 * @param overrides - 可选的部分覆盖字段，如传入自定义 cfg 或初始 data
 * @returns 初始化后的 ICtx 实例
 */
export function createContext(overrides: Partial<ICtx> = {}): ICtx {
  return {
    cfg: {},
    task: {
      current: null,
      attempts: {},
      data: {},
    },
    ...overrides,
  };
}

// ============================================================
//  引擎状态
// ============================================================

/** 引擎是否正在运行。同一时间只允许一个任务执行，防止并发冲突 */
let engineActive = false;

/** 暂停标志。为 true 时主循环挂起等待恢复，由 togglePause() 切换 */
let pauseFlag = false;

/**
 * 用户主动停止标志
 *
 * 由 stopEngine() 设置为 true，用于通知 runTaskChain 停止后续任务。
 * 与 engineActive 的区别：
 *   - engineActive 在每次 run() 结束时重置为 false
 *   - stopped 跨任务持久化，确保整个任务链都会停止
 *   - stopped 只在 runTaskChain() 开头统一重置
 */
let stopped = false;

// ============================================================
//  引擎控制
// ============================================================

/**
 * 切换暂停/继续状态
 *
 * 暂停时 Task.run() 内部会调用 step.onPause（释放资源/记录状态），
 * 恢复时调用 onResume（重新初始化），同时 toast 提示用户。
 */
export function togglePause() {
  pauseFlag = !pauseFlag;
  toast(pauseFlag ? "已暂停" : "继续执行");
}

/**
 * 停止引擎
 *
 * 重置 engineActive 和 pauseFlag 让 Task.run() 的 while 循环退出，
 * 设置 stopped = true 让 runTaskChain 的 for 循环也退出。
 * 用户点击"停止"按钮时调用。
 */
export function stopEngine() {
  engineActive = false;
  pauseFlag = false;
  stopped = true;
}

// ============================================================
//  单任务执行
// ============================================================

/**
 * 运行单个任务
 *
 * Engine 的薄包装层，只负责：
 *   1. 并发防护（同一时间只允许一个任务）
 *   2. 初始化引擎状态
 *   3. 创建 IEngineControl 注入到 Task
 *   4. 委托 task.run() 执行步骤循环
 *   5. 重置引擎活跃状态
 *
 * 步骤循环、恢复策略、步骤跳转等逻辑由 BaseTask.run() 实现。
 *
 * @param task      - 任务定义
 * @param startStep - 可选的起始步骤 key，默认使用 task.firstStep
 * @param ctx       - 可选的执行上下文，不传则自动创建
 * @returns true 表示任务正常完成，false 表示异常退出
 */
export function run(
  task: ITask,
  startStep?: string,
  ctx?: ICtx
): boolean {
  // 防止并发
  if (engineActive) {
    toast("已有任务运行");
    return false;
  }

  // 初始化引擎状态
  // 注意：不在此处重置 stopped，stopped 由 runTaskChain() 统一管理
  engineActive = true;
  pauseFlag = false;
  if (!ctx) ctx = createContext();

  // 创建引擎控制接口，注入到 Task
  // Task 通过 control 查询暂停/停止状态，委托弹窗处理
  const control: IEngineControl = {
    isPaused: () => pauseFlag,
    isActive: () => engineActive,
  };

  // 委托 Task 执行步骤循环
  const success = task.run(ctx, startStep, control);

  // 重置引擎活跃状态
  engineActive = false;

  return success;
}

// ============================================================
//  任务链执行
// ============================================================

/**
 * 任务链项定义
 *
 * - task:      要执行的任务
 * - runs:      重复执行次数，默认 1（目前固定为 1）
 * - startStep: 可选的起始步骤，用于从中间步骤开始执行
 */
export interface ITaskChainItem {
  task: ITask;
  runs?: number;
  startStep?: string;
}

/**
 * 按顺序执行任务链
 *
 * 用户在 UI 上勾选多个任务后，这些任务被组装成一条任务链依次执行。
 * 每个任务之间间隔 2 秒，确保前一个任务的资源释放完毕。
 *
 * 任务失败处理策略：
 *   - 用户主动停止（stopped = true）→ 不再执行任何后续任务
 *   - 任务执行失败（run 返回 false）→ 调用 task.recoverFromStep() 恢复游戏状态后继续下一个
 *
 * @param taskList - 任务链配置列表
 * @param ctx      - 可选的共享执行上下文，所有任务共用同一份状态
 */
export function runTaskChain(
  taskList: ITaskChainItem[],
  ctx?: ICtx
): void {
  if (!ctx) ctx = createContext();

  // 统一重置停止标志
  // 放在此处而非 run() 中，确保用户主动停止后整个链都会中断
  stopped = false;

  log("开始执行任务链", taskList.map((item) => item.task.name).join(", "));

  for (const item of taskList) {
    const task = item.task;
    const runs = item.runs || 1;
    const startStep = item.startStep;

    for (let i = 0; i < runs; i++) {
      // 用户主动停止 → 跳出所有循环
      if (stopped) break;

      log(`===== 开始任务: ${task.name} 第 ${i + 1}/${runs} 次 =====`);
      const success = run(task, startStep, ctx);

      if (success) {
        log(`===== 任务 ${task.name} 完成 =====`);
      } else {
        log(`===== 任务 ${task.name} 失败 =====`);

        // 非用户主动停止的情况下，尝试恢复游戏状态以继续后续任务
        if (!stopped) {
          try {
            log("尝试恢复游戏状态以继续后续任务...");
            const recovered = task.recoverFromStep(ctx, null);
            if (recovered) {
              log("游戏状态已恢复，继续执行下一个任务");
            } else {
              // 恢复失败仍继续，因为下一个任务的 run() 内部也有恢复机制
              toastLog("无法恢复游戏状态，后续任务可能受影响");
            }
          } catch (e) {
            guardScriptInterrupt(e);
          }
        }
      }

      // 用户主动停止 → 跳出所有循环
      if (stopped) break;

      // 任务间间隔，给游戏页面切换留出时间
      sleep(2000);
    }
  }

  log("所有任务链执行完毕");
}
