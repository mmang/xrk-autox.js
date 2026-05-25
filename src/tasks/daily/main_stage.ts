import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ScreenHelper } from "../../utils";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { BaseTask } from "../base_task";
import { getConfig } from "../../config/loader";

class ClickStartBattle extends Step {
    name = "点击开始战斗";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        // 不需要前置检查，回到主页就已经验证过了
        ClickHelper.tap(getConfig().daily.stage.startBattlePos.x, getConfig().daily.stage.startBattlePos.y);
        sleep(1000);
    }

    nextStep(ctx: ICtx): string {
        return ClickBattle.name;
    }
}

class ClickBattle extends Step {
    name = "点击出战";
    confirmAttempts = 10;

    preCheck(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.stage.battleBtn);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.stage.battlePos.x, getConfig().daily.stage.battlePos.y);
        sleep(500);
    }

    nextStep(ctx: ICtx): string {
        return ClickPause.name;
    }
}

class ClickPause extends Step {
    name = "点击暂停";
    confirmAttempts = 10;

    preCheck(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.stage.refreshBtn);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.stage.pausePos.x, getConfig().daily.stage.pausePos.y);
        sleep(500);
    }

    nextStep(ctx: ICtx): string {
        return ClickExit.name;
    }
}

class ClickExit extends Step {
    name = "点击退出";
    confirmAttempts = 10;

    preCheck(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.stage.exitBtn);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.stage.exitPos.x, getConfig().daily.stage.exitPos.y);
        sleep(500);
    }

    nextStep(ctx: ICtx): string {
        return ConfirmExit.name;
    }
}

class ConfirmExit extends Step {
    name = "确认退出关卡";

    preCheck(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.stage.confirmBtn);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.stage.confirmExitPos.x, getConfig().daily.stage.confirmExitPos.y);
        sleep(500);
    }

    nextStep(ctx: ICtx): string {
        return DoubleReward.name;
    }
}

// 双倍奖励
class DoubleReward extends Step {
    name = "双倍奖励";

    canSkip(ctx: ICtx): boolean {
        // 检查是否有双倍奖励
        return !OcrHelper.hasText(getConfig().daily.stage.doubleRewardBtn);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.stage.doubleRewardPos.x, getConfig().daily.stage.doubleRewardPos.y);
        sleep(1000);
        ClickHelper.tap(getConfig().daily.stage.closeRewardPos.x, getConfig().daily.stage.closeRewardPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.stage.settleBtn);
    }

    nextStep(ctx: ICtx): string {
        return SettlePage.name;
    }
}


class SettlePage extends Step {
    name = "确定（结算页面）";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.stage.settlePos.x, getConfig().daily.stage.settlePos.y);
        sleep(1500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.stage.startBattleBtn);
    }
}

export const mainStageTask: ITask = new BaseTask({
    name: "主线关卡",
    businessSteps: {
        ClickStartBattle: new ClickStartBattle(),
        ClickBattle: new ClickBattle(),
        ClickPause: new ClickPause(),
        ClickExit: new ClickExit(),
        ConfirmExit: new ConfirmExit(),
        SettlePage: new SettlePage(),
        DoubleReward: new DoubleReward(),
    },
});
