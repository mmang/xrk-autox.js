import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ScreenHelper } from "../../utils";
import { ClickHelper } from "../../utils/click";
import { Logger } from "../../utils/logger";
import { OcrHelper } from "../../utils/ocr";
import { getConfig } from "../../config/loader";
import { BaseTask } from "../base_task";

class OpenGuild extends Step {
    name = "打开工会";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.donate.guildTabPos.x, getConfig().guild.donate.guildTabPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.donate.guildHall);
    }

    nextStep(ctx: ICtx): string {
        return EnterDonate.name;
    }
}

class EnterDonate extends Step {
    name = "进入捐献页面";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.donate.donateEntryPos.x, getConfig().guild.donate.donateEntryPos.y);
        sleep(800);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.donate.donateBtn);
    }

    nextStep(ctx: ICtx): string {
        return ClickGoldDonate.name;
    }
}

class ClickGoldDonate extends Step {
    name = "金币捐献";
    confirmAttempts = 10;
    nextStepName: string = STEP_END;

    canSkip(ctx: ICtx, task: ITask): boolean {
        if (!ScreenHelper.findMultiColors(getConfig().guild.donate.donateBtnRedDot)) {
            Logger.info(this.tag, "未检测到捐献按钮红点,今日已捐献完成");
            this.nextStepName = STEP_END;
            return true;
        }
        return false;
    }

    action(ctx: ICtx, task: ITask): void {
        let i = 0;
        while (i < 5) {
            ClickHelper.tap(getConfig().guild.donate.goldDonateBtnPos.x, getConfig().guild.donate.goldDonateBtnPos.y);
            sleep(500);
            ClickHelper.tap(getConfig().guild.donate.goldDonateBtnPos.x, getConfig().guild.donate.goldDonateBtnPos.y);
            sleep(500);
            if (!ScreenHelper.findMultiColors(getConfig().guild.donate.donateBtnRedDot)) {
                Logger.info(this.tag, "未检测到捐献按钮红点,今日已捐献完成");
                this.nextStepName = STEP_END;
                return;
            }
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

export const guildDonateTask: ITask = new BaseTask({
    name: "工会捐献",
    businessSteps: {
        OpenGuild: new OpenGuild(),
        EnterDonate: new EnterDonate(),
        ClickGoldDonate: new ClickGoldDonate(),
    },
});
