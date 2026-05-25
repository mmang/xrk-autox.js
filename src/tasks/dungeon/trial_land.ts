import { Step, ITask, ICtx } from "../../core/step";
import { BaseTask } from "../base_task";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { ClickPlayTab, ScrollToTop } from "./play_tab_base";
import { getConfig } from "../../config/loader";

class ClickTrialLand extends Step {
    name = "点击试炼之地";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.trial.trialLandPos.x, getConfig().dungeon.trial.trialLandPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.trial.sweepText);
    }

    nextStep(ctx: ICtx): string {
        return ClickSweep.name;
    }
}

class ClickSweep extends Step {
    name = "扫荡";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.trial.sweepPos.x, getConfig().dungeon.trial.sweepPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return ClickFreeSweep.name;
    }
}

class ClickFreeSweep extends Step {
    name = "免费扫荡";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.trial.freeSweepPos.x, getConfig().dungeon.trial.freeSweepPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.trial.limitReached);
    }

    nextStep(ctx: ICtx): string {
        return BackToPlay.name;
    }
}

class BackToPlay extends Step {
    name = "返回玩法";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.trial.backToPlayPos.x, getConfig().dungeon.trial.backToPlayPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const trialLandTask: ITask = new BaseTask({
    name: "试炼之地",
    businessSteps: {
        ClickPlayTab: new ClickPlayTab(),
        ScrollToTop: new ScrollToTop(ClickTrialLand.name),
        ClickTrialLand: new ClickTrialLand(),
        ClickSweep: new ClickSweep(),
        ClickFreeSweep: new ClickFreeSweep(),
        BackToPlay: new BackToPlay(),
    },
});
