import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { BaseTask } from "../base_task";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { ClickPlayTab, ScrollToTop } from "./play_tab_base";
import { Logger, recycleImage, ScreenHelper } from "../../utils";
import { getConfig } from "../../config/loader";

class ClickAbyssLord extends Step {
    name = "点击深渊领主";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.abyss.abyssLordPos.x, getConfig().dungeon.abyss.abyssLordPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.abyss.abyssLordTitle);
    }
    nextStep(ctx: ICtx): string {
        return SweepAbyssLord.name;
    }
}


// 扫荡深渊领主
class SweepAbyssLord extends Step {
    name = "扫荡深渊领主";
    confirmAttempts = 10;
    nextStepName = ConfirmSweepAbyssLord.name;

    canSkip(ctx: ICtx, task: ITask): boolean {
        // 判断是否有扫荡按钮，并且次数大于0
        const img = ScreenHelper.tryCapture();
        if (!img) return false;
        try {
            // 没有扫荡按钮，或者次数为0，跳过扫荡步骤
            const hasSweepBtn = !OcrHelper.hasText(getConfig().dungeon.abyss.saoDangBtn, img) || OcrHelper.hasText(getConfig().dungeon.abyss.saoDangCount, img);
            Logger.info(this.tag, `是否跳过扫荡步骤: ${hasSweepBtn}`);
            this.nextStepName = hasSweepBtn ? STEP_END : ConfirmSweepAbyssLord.name;
            return hasSweepBtn;
        } finally {
            recycleImage(img);
        }
    }


    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.abyss.saoDangPos.x, getConfig().dungeon.abyss.saoDangPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

/**
 * 确认扫荡
 */
class ConfirmSweepAbyssLord extends Step {
    name = "确认扫荡深渊领主";
    confirmAttempts = 10;
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.abyss.confirmSweepPos.x, getConfig().dungeon.abyss.confirmSweepPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.abyss.settleBtn);
    }

    nextStep(ctx: ICtx): string {
        return SettleAbyssLord.name;
    }

}

/**
 * {x:425,y:2092,w:230,h:98}
 * 
 * 挑战结束，结算
 */
class SettleAbyssLord extends Step {
    name = "结算深渊领主";
    confirmAttempts = 10;
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.abyss.settlePos.x, getConfig().dungeon.abyss.settlePos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
    nextStep(ctx: ICtx): string {
        return STEP_END;
    }
}



export const abyssLordTask: ITask = new BaseTask({
    name: "深渊领主",
    businessSteps: {
        ClickPlayTab: new ClickPlayTab(),
        ScrollToTop: new ScrollToTop(ClickAbyssLord.name),
        ClickAbyssLord: new ClickAbyssLord(),
        SweepAbyssLord: new SweepAbyssLord(),
        ConfirmSweepAbyssLord: new ConfirmSweepAbyssLord(),
        SettleAbyssLord: new SettleAbyssLord(),
    },
});
