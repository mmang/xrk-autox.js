import { Step, ITask, ICtx } from "../../core/step";
import { BaseTask } from "../base_task";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { ClickPlayTab, ScrollToTop } from "./play_tab_base";
import { getConfig } from "../../config/loader";

/** 点击精英挑战 */
class ClickEliteChallenge extends Step {
    name = "点击精英挑战";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.elite.eliteChallengePos.x, getConfig().dungeon.elite.eliteChallengePos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.elite.eliteTitle);
    }

    nextStep(ctx: ICtx): string {
        return ClickSweep.name;
    }
}

/** 点击扫荡 */
class ClickSweep extends Step {
    name = "点击扫荡";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.elite.sweepPos.x, getConfig().dungeon.elite.sweepPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.elite.sweepText);
    }

    nextStep(ctx: ICtx): string {
        return CheckLimitReached.name;
    }
}

/** 检测已达上限和确认扫荡 */
class CheckLimitReached extends Step {
    name = "检测已达上限";
    nextStepName: string = CloseSweepWindow.name;

    canSkip(ctx: ICtx, task: ITask): boolean {
        // 检查是否已达上限
        return OcrHelper.hasText(getConfig().dungeon.elite.limitReached);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.elite.confirmSweepPos.x, getConfig().dungeon.elite.confirmSweepPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return CloseSweepWindow.name;
    }
}

/** 关闭扫荡窗口 */
class CloseSweepWindow extends Step {
    name = "关闭扫荡窗口";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.elite.closeSweepPos.x, getConfig().dungeon.elite.closeSweepPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const eliteChallengeTask: ITask = new BaseTask({
    name: "精英挑战",
    businessSteps: {
        ClickPlayTab: new ClickPlayTab(),
        ScrollToTop: new ScrollToTop(ClickEliteChallenge.name),
        ClickEliteChallenge: new ClickEliteChallenge(),
        ClickSweep: new ClickSweep(),
        CheckLimitReached: new CheckLimitReached(),
        CloseSweepWindow: new CloseSweepWindow(),
    },
});
