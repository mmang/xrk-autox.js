import { ICtx, IEngineControl, ITask, STEP_END, Step } from "../core/step";
import { Logger } from "../utils/logger";
import { ScreenHelper } from "../utils/screen";
import { recycleImage } from "../utils/image";
import { createBaseSteps, DualAppMode } from "./game_base";
import { ClickHelper } from "../utils";
import { getConfig } from "../config/loader";
import { guardScriptInterrupt } from "../utils/script_guard";

const TAG = "BaseTask";

export class BaseTask implements ITask {
    name: string = "";
    firstStep: string = "";
    packageName: string = "com.bwxrk.yqmy.ty4";
    skipHomeCheck: boolean = false;
    steps: Record<string, Step> = {};
    launchSteps: Record<string, Step> = createBaseSteps();

    constructor(config: Partial<ITask> & { businessSteps?: Record<string, Step>; dualAppMode?: DualAppMode } = {}) {
        const { businessSteps, dualAppMode, ...rest } = config;
        Object.assign(this, rest);
        if (dualAppMode) {
            this.launchSteps = createBaseSteps(STEP_END, dualAppMode);
        }
        if (businessSteps) {
            this.steps = businessSteps;
            if (!this.firstStep) {
                this.firstStep = Object.keys(businessSteps)[0] || "";
            }
        }
        if (Object.keys(this.steps).length === 0 && this.launchSteps) {
            this.steps = this.launchSteps;
            if (!this.firstStep) {
                this.firstStep = Object.keys(this.launchSteps)[0] || "";
            }
        }
    }

    /**
     * 执行启动步骤（launchSteps）
     *
     * 从 launchSteps 的第一个步骤开始顺序执行，最后验证是否回到主页。
     * 典型场景：任务开始前不在游戏主页、异常恢复需要重启应用。
     */
    executeLaunchSteps(ctx: ICtx): boolean {
        if (!this.launchSteps) return false;
        try {
            let current = Object.keys(this.launchSteps)[0] || "LaunchApp";
            while (current !== STEP_END) {
                const step = this.launchSteps[current];
                if (!step) break;
                step.taskRef = this;
                const next = step.execute(ctx, this);
                current = next;
            }
            return this.goHome();
        } catch (e) {
            guardScriptInterrupt(e);
            Logger.error(TAG, `启动步骤执行失败: ${e}`);
            return false;
        }
    }

    /**
     * 三级恢复策略
     *
     * 依次尝试：
     *   1. step.recover() — 步骤自身恢复逻辑
     *   2. task.goHome()  — 回到游戏主页
     *   3. executeLaunchSteps() — 完整重启应用
     */
    recoverFromStep(ctx: ICtx, step: Step | null): boolean {
        let recovered = false;
        // 第一级：步骤自身恢复（step 为 null 时跳过）
        if (step) {
            try { recovered = step.recover(ctx, this); } catch (e) {
                guardScriptInterrupt(e);
                recovered = false;
            }
        }
        // 第二级：回到主页
        if (!recovered) recovered = this.goHome();
        // 第三级：关闭应用 + 重新启动
        if (!recovered) {
            this.forceStopApp();
            recovered = this.executeLaunchSteps(ctx);
        }
        return recovered;
    }

    /**
     * 强制关闭目标应用
     *
     * 三级恢复策略中使用，在重新启动应用前先强制关闭，
     * 确保应用不会卡在异常页面。
     */
    private forceStopApp(): void {
        Logger.info(TAG, `强制关闭应用: ${this.packageName}`);
        try {
            shell(`am force-stop ${this.packageName}`, true);
            sleep(2000);
        } catch (e) {
            guardScriptInterrupt(e);
            Logger.error(TAG, `关闭应用失败: ${e}`);
        }
    }

    /**
     * 执行任务的步骤循环
     *
     * 完整生命周期：
     *   暂停处理 → 主页检查 → 步骤执行 → 步骤跳转 → 异常恢复
     *
     * 循环条件（三者同时满足才继续）：
     *   - current !== STEP_END  — 步骤尚未走完
     *   - recoveryCount <= MAX_RECOVERY  — 恢复次数未超限
     *   - control.isActive()  — 引擎未被停止
     */
    run(ctx: ICtx, startStep?: string, control?: IEngineControl): boolean {
        // 注入 taskRef 到每个 Step 实例
        for (const key in this.steps) {
            this.steps[key].taskRef = this;
        }
        if (this.launchSteps) {
            for (const key in this.launchSteps) {
                this.launchSteps[key].taskRef = this;
            }
        }

        let current = startStep || this.firstStep;
        let recoveryCount = 0;
        const MAX_RECOVERY = 2;
        let exitReason = "";

        Logger.info(TAG, `[${this.name}] 起始: ${current}`);

        while (current !== STEP_END && recoveryCount <= MAX_RECOVERY) {
            // 引擎已停止则退出
            if (control && !control.isActive()) break;

            // ---- 暂停处理 ----
            if (control && control.isPaused()) {
                const stepObj = this.steps[current] || this.steps[this.firstStep];
                if (stepObj) stepObj.onPause(ctx, this);
                while (control.isPaused() && control.isActive()) {
                    sleep(500);
                }
                if (stepObj) stepObj.onResume(ctx, this);
                if (!control.isActive()) { exitReason = "引擎已停止"; break; }
            }

            // ---- 步骤查找 ----
            const stepObj = this.steps[current];
            if (!stepObj) {
                toastLog(`未定义步骤: ${current}`);
                exitReason = `未定义步骤: ${current}`;
                break;
            }

            // ---- 首步骤主页检查 ----
            if (current === this.firstStep && !this.skipHomeCheck) {
                const onHome = this.goHome();
                if (!onHome) {
                    Logger.info(TAG, "不在主界面，执行启动流程...");
                    const recovered = this.recoverFromStep(ctx, stepObj);
                    if (recovered) {
                        current = this.firstStep;
                        recoveryCount++;
                        continue;
                    } else {
                        toastLog("无法回到主界面，停止");
                        exitReason = `步骤 ${current} 启动前无法回到主界面`;
                        break;
                    }
                }
            }

            // ---- 执行步骤 ----
            let nextStep: string;
            try {
                nextStep = stepObj.execute(ctx, this);
            } catch (e) {
                guardScriptInterrupt(e);
                Logger.error(TAG, `步骤异常: ${e}`);
                const recovered = this.recoverFromStep(ctx, stepObj);
                if (recovered) {
                    current = this.firstStep;
                    recoveryCount++;
                    continue;
                } else {
                    toastLog("多次恢复失败，停止");
                    exitReason = `步骤 ${current} 执行异常(${e})，恢复${recoveryCount}次后仍失败`;
                    break;
                }
            }

            // ---- 步骤跳转 ----
            if (nextStep === "RECOVER") {
                try { stepObj.recover(ctx, this); } catch (e) { guardScriptInterrupt(e); }
                current = this.firstStep;
                recoveryCount++;
            } else {
                current = nextStep;
            }
        }

        const success = current === STEP_END;
        if (success) {
            this.goHome();
        }
        Logger.info(TAG, `[${this.name}] 流程${success ? "完成" : "异常退出: " + exitReason}`);
        return success;
    }

    protected homeIndicator(): boolean {
        try {
            const img = ScreenHelper.tryCapture();
            if (img) {
                try {
                    const result = ScreenHelper.findMultiColorsInImg(img, getConfig().system.game.lobbyColor);
                    return result !== null;
                } finally {
                    recycleImage(img);
                }
            }
            return false;
        } catch (e) {
            guardScriptInterrupt(e);
            return false;
        }
    }

    goHome(): boolean {
        if (this.homeIndicator()) {
            Logger.info(TAG, "已在主页，无需返回");
            return true;
        }
        Logger.info(TAG, "任务结束，返回主页...");
        try {
            for (let i = 0; i < 10; i++) {
                const match = ScreenHelper.findMultiColors(getConfig().system.game.backBtnColor);
                if (match) {
                    Logger.info(TAG, "检测到返回按钮，点击返回");
                    ClickHelper.tap(match.x, match.y);
                } else {
                    back();
                }
                sleep(800);
                if (this.homeIndicator()) {
                    Logger.info(TAG, "已返回主页");
                    return true;
                }
            }
        } catch (e) {
            guardScriptInterrupt(e);
        }
        Logger.error(TAG, "返回主页失败");
        return false;
    }
}
