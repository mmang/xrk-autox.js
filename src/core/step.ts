export const STEP_END = "END";

/**
 * 引擎控制接口
 *
 * Task 运行步骤循环时需要感知引擎状态（暂停、停止），
 * 通过此接口注入，避免 Task 反向依赖 Engine 模块。
 *
 * Engine 在调用 task.run() 时创建实现此接口的对象传入，
 * Task 内部通过 control 查询引擎状态。
 */
export interface IEngineControl {
  /** 引擎是否处于暂停状态 */
  isPaused(): boolean;
  /** 引擎是否仍在运行（未被停止） */
  isActive(): boolean;
}

/**
 * 执行上下文，在整个任务链中共享状态
 *
 * - cfg: 全局配置，由 UI 传入或默认值
 * - task.current: 当前正在执行的步骤名称
 * - task.attempts: 每个步骤成功时消耗的重试次数记录
 * - task.data: 步骤间共享数据，如 remainingRuns、购买结果等
 */
export interface ICtx {
  cfg: any;
  task: {
    current: string | null;
    attempts: Record<string, number>;
    data: any;
  };
}

/**
 * 任务定义接口
 *
 * - name: 任务名称，用于日志和 UI 显示
 * - firstStep: 任务启动时执行的第一个步骤 key（对应 steps 中的键名）
 * - packageName: 目标应用包名，用于启动应用和判断前台
 * - goHome: 返回游戏主页，返回 true 表示成功，false 表示失败
 * - steps: 业务步骤映射表，key 为步骤名，value 为 Step 实例
 * - launchSteps: 启动步骤映射表（可选），包含从启动应用到进入主页的步骤。
 *   引擎在任务开始前和异常恢复时使用。默认由 BaseTask 提供。
 * - skipHomeCheck: 是否跳过首步骤的主页确认检查，默认 false。
 *   启动游戏类任务可设为 true，因为任务本身就是从外部启动应用，不需要预先确认主页。
 *
 * 步骤执行相关方法（由 BaseTask 实现，Engine 通过 ITask 接口调用）：
 * - run: 执行任务的步骤循环，包含暂停/恢复/跳转等完整逻辑
 * - executeLaunchSteps: 执行启动步骤，确保回到游戏主页
 * - recoverFromStep: 三级恢复策略（step.recover → goHome → forceStop + launchSteps）
 */
export interface ITask {
  name: string;
  firstStep: string;
  packageName: string;
  goHome: () => boolean;
  steps: Record<string, Step>;
  launchSteps?: Record<string, Step>;
  skipHomeCheck?: boolean;

  /**
   * 执行任务的步骤循环
   *
   * 包含完整的步骤执行生命周期：
   * 暂停处理 → 主页检查 → 步骤执行 → 步骤跳转 → 异常恢复
   *
   * @param ctx     - 执行上下文
   * @param startStep - 可选的起始步骤 key
   * @param control - 引擎控制接口，用于查询暂停/停止状态
   * @returns true 任务正常完成，false 异常退出
   */
  run(ctx: ICtx, startStep?: string, control?: IEngineControl): boolean;

  /**
   * 执行启动步骤（launchSteps）
   *
   * 当任务开始前不在主页、或异常恢复需要重启应用时调用。
   *
   * @param ctx - 执行上下文
   * @returns true 成功回到主页，false 恢复失败
   */
  executeLaunchSteps(ctx: ICtx): boolean;

  /**
   * 三级恢复策略
   *
   * 当步骤执行失败时，依次尝试：
   *   1. step.recover() — 步骤自身恢复
   *   2. task.goHome()  — 回到游戏主页
   *   3. forceStopApp() + executeLaunchSteps() — 强制关闭应用后重新启动
   *
   * @param ctx  - 执行上下文
   * @param step - 触发恢复的步骤，为 null 时跳过步骤级恢复
   * @returns true 恢复成功，false 全部失败
   */
  recoverFromStep(ctx: ICtx, step: Step | null): boolean;
}

/**
 * 步骤状态未确认异常
 *
 * 当 action 执行后 confirmCondition 在轮询次数内仍未满足时抛出
 */
export class StateNotReachedError extends Error {
  constructor(stepName: string, desc: string) {
    super(`步骤 ${stepName} 未能确认: ${desc}`);
    this.name = "StateNotReachedError";
  }
}

/**
 * 步骤抽象基类
 *
 * 每个步骤代表游戏流程中的一个原子操作（如点击按钮、等待页面加载等）。
 * 子类必须实现 name、action，可选覆盖 confirmCondition、preCheck 等钩子。
 *
 * 执行流程（与流程图对齐）：
 *   1. canSkip → 满足则跳过，走 nextStep
 *   2. preCheck 轮询 → 不满足走 onPreCheckFailed
 *   3. action（步骤核心操作）
 *   4. confirmCondition 轮询 → 不满足走 onConfirmFailed
 *   5. 满足 → nextStep
 */
export abstract class Step {
  /** 步骤名称，用于日志输出 */
  abstract name: string;

  /**
   * 当前任务引用，由引擎在执行前自动设置
   *
   * 子类可通过 this.taskRef 访问 goHome 等任务级方法，
   * 无需通过 action/confirmCondition 的参数传递。
   */
  taskRef: ITask | null = null;

  /**
   * 日志标签，优先使用任务名称，fallback 到步骤名称
   */
  get tag(): string {
    return this.taskRef?.name || this.name;
  }

  /** 前置条件轮询间隔（毫秒），默认 500ms */
  preCheckInterval: number = 500;

  /** 前置条件轮询次数，默认 6 次（6×500ms=3s） */
  preCheckAttempts: number = 6;

  /** 确认条件轮询间隔（毫秒），默认 500ms */
  confirmInterval: number = 500;

  /** 确认条件轮询次数，默认 6 次（6×500ms=3s） */
  confirmAttempts: number = 6;

  /**
   * 步骤的核心动作
   *
   * 在此执行点击、OCR 识别、滑动等操作。
   * 执行完毕后引擎会自动轮询 confirmCondition 确认。
   */
  abstract action(ctx: ICtx, task: ITask): void;

  /**
   * 返回一个判断当前状态是否已达到预期的函数
   *
   * 引擎会在 action 执行后轮询此函数，直到返回 true 或超过轮询次数。
   * 例如：OCR 识别到目标文字、多点找色命中、控件出现等。
   *
   * 默认返回 () => true，子类可复写实现具体确认逻辑。
   */
  confirmCondition(): () => boolean {
    return () => true;
  }

  /**
   * 前置条件检查（可选）
   *
   * 在 action 执行前调用。返回一个判断函数，引擎会在 action 之前轮询此条件。
   * 不满足时走 onPreCheckFailed 回调，不会执行无效的 action。
   *
   * 适用场景：确认按钮已加载再点击、确认页面已切换再操作、避免过渡动画期间盲点。
   *
   * 默认返回 () => true（不启用前置检查，行为与当前一致）。
   */
  preCheck(): () => boolean {
    return () => true;
  }

  /**
   * 前置条件检查失败后的处理（可选覆写）
   *
   * 默认：返回 undefined（抛出 StateNotReachedError，由上层恢复策略处理）
   * 返回步骤名：跳转到指定步骤
   * 返回 STEP_END：终止任务
   */
  onPreCheckFailed(ctx: ICtx, task: ITask): string | undefined {
    return undefined;
  }

  /**
   * 确认条件检查失败后的处理（可选覆写）
   *
   * 默认：返回 undefined（抛出 StateNotReachedError，由上层恢复策略处理）
   * 返回步骤名：跳转到指定步骤
   * 返回 STEP_END：终止任务
   */
  onConfirmFailed(ctx: ICtx, task: ITask): string | undefined {
    return undefined;
  }

  /**
   * 步骤成功后跳转到下一步
   *
   * 返回 steps 映射表中的 key，STEP_END 表示任务结束。
   * 默认返回 STEP_END。
   */
  nextStep(ctx: ICtx): string {
    return STEP_END;
  }

  /**
   * 前置条件检查
   *
   * 在 action 执行前调用，返回 true 则跳过本步骤，直接走 nextStep。
   * 可用于条件性步骤，如"如果剩余次数 > 0 才执行"。
   */
  canSkip(ctx: ICtx, task: ITask): boolean {
    return false;
  }

  /** 任务暂停时的回调，可用于释放资源或记录状态 */
  onPause(ctx: ICtx, task: ITask): void { }

  /** 任务恢复时的回调，可用于重新初始化 */
  onResume(ctx: ICtx, task: ITask): void { }

  /**
   * 异常恢复策略
   *
   * 当步骤执行失败且引擎需要恢复时调用。
   * 默认策略：委托 task.goHome()。
   * 子类可覆盖此方法实现自定义恢复逻辑。
   *
   * @returns true 表示已恢复到可继续状态，false 表示恢复失败
   */
  recover(ctx: ICtx, task: ITask): boolean {
    return task.goHome();
  }

  /**
   * 步骤的完整执行流程（由引擎调用，一般不需要手动调用）
   *
   * 流程（与流程图对齐）：
   *   1. canSkip → 满足则跳过
   *   2. preCheck 轮询 → 不满足走 onPreCheckFailed
   *   3. action
   *   4. confirmCondition 轮询 → 不满足走 onConfirmFailed
   *   5. 满足 → nextStep
   */
  execute(ctx: ICtx, task: ITask): string {
    ctx.task.current = this.name;
    this.taskRef = task;
    log(`→ 执行步骤: ${this.name}`);

    // 是否能跳过本步骤
    if (this.canSkip(ctx, task)) {
      log(`⚠ 跳过步骤 ${this.name}`);
      return this.nextStep(ctx);
    }

    // 1. 检查运行条件（preCheck 轮询）
    const preCond = this.preCheck();
    if (preCond) {
      const preOk = this.pollCondition(preCond, this.preCheckInterval, this.preCheckAttempts);
      if (!preOk) {
        const result = this.onPreCheckFailed(ctx, task);
        if (result !== undefined) {
          log(`⚠ ${this.name} 前置检查失败: ${result === STEP_END ? "终止" : `跳转 ${result}`}`);
          return result;
        }
        throw new StateNotReachedError(this.name, "前置条件未满足");
      }
    }

    // 2. 执行操作
    this.action(ctx, task);

    // 3. 确认结果（confirmCondition 轮询）
    const cond = this.confirmCondition();
    const ok = this.pollCondition(cond, this.confirmInterval, this.confirmAttempts);
    if (ok) {
      const next = this.nextStep(ctx);
      log(`✓ ${this.name} 成功，前往: ${next}`);
      return next;
    }

    // 4. 确认失败
    const result = this.onConfirmFailed(ctx, task);
    if (result !== undefined) {
      log(`⚠ ${this.name} 确认失败: ${result === STEP_END ? "终止" : `跳转 ${result}`}`);
      return result;
    }
    throw new StateNotReachedError(this.name, "确认条件未满足");
  }

  /**
   * 轮询条件函数
   *
   * 在指定次数内，按间隔轮询条件函数，任一次返回 true 即视为成功。
   *
   * @param condition - 条件判断函数
   * @param interval  - 轮询间隔（毫秒）
   * @param attempts  - 最大轮询次数
   * @returns true 条件满足，false 超过次数仍未满足
   */
  private pollCondition(condition: () => boolean, interval: number, attempts: number): boolean {
    for (let i = 0; i < attempts; i++) {
      if (condition()) return true;
      sleep(interval);
    }
    return false;
  }
}

/**
 * 主页步骤的简单实现
 *
 * 适用于任务流程的最后一个步骤，通过 task.goHome() 返回主页。
 */
export class HomeStep extends Step {
  name = "回到主页";
  action(ctx: ICtx, task: ITask): void {
    task.goHome();
  }
  confirmCondition(): () => boolean {
    return () => true;
  }
}
