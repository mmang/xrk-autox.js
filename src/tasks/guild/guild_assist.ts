import { Step, ITask, ICtx, STEP_END, StateNotReachedError } from "../../core/step";
import { BaseTask } from "../base_task";
import { OcrHelper } from "../../utils/ocr";
import { ClickHelper } from "../../utils/click";
import { ScreenHelper } from "../../utils/screen";
import { Logger } from "../../utils/logger";
import { getConfig } from "../../config/loader";


class OpenManor extends Step {
    name = "打开庄园";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.assist.manorPos.x, getConfig().guild.assist.manorPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().guild.assist.manorOpened) !== null;
    }

    nextStep(ctx: ICtx): string {
        return OpenNeighborPanel.name;
    }
}

class OpenNeighborPanel extends Step {
    name = "打开邻居面板";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.assist.neighborPanelPos.x, getConfig().guild.assist.neighborPanelPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.assist.neighborPanel);
    }

    nextStep(ctx: ICtx): string {
        return CheckAssistable.name;
    }
}

class CheckAssistable extends Step {
    name = "可协助好友";
    nextStepName = ClickVisit.name;

    action(ctx: ICtx, task: ITask): void {
        const result = ScreenHelper.findMultiColors(getConfig().guild.assist.assistableColor);
        if (result) {
            Logger.info(this.tag, "检测到可协助好友，点击");
            ClickHelper.tap(result.x, result.y);
            sleep(1000);
        } else {
            Logger.info(this.tag, "无可协助好友，协助结束");
            this.nextStepName = STEP_END;
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

class ClickVisit extends Step {
    name = "点击拜访";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.assist.visitBtnPos.x, getConfig().guild.assist.visitBtnPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().guild.assist.oneClickColor) !== null;
    }

    nextStep(ctx: ICtx): string {
        return ClickAssist.name;
    }
}

class ClickAssist extends Step {
    name = "一键协助";

    action(ctx: ICtx, task: ITask): void {
        // 点击协助
        ClickHelper.tap(getConfig().guild.assist.assistBtnPos.x, getConfig().guild.assist.assistBtnPos.y);
        sleep(2000);
        // 关闭弹出的奖励弹窗，有时候没有这个奖励
        ClickHelper.tap(getConfig().guild.assist.assistBtnPos.x, getConfig().guild.assist.assistBtnPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return ClickLike.name;
    }
}

class ClickLike extends Step {
    name = "点赞";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.assist.likeBtnPos.x, getConfig().guild.assist.likeBtnPos.y);
        sleep(2000);
        ClickHelper.tap(getConfig().guild.assist.likeBtnPos.x, getConfig().guild.assist.likeBtnPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return BackToNeighbor.name;
    }
}

class BackToNeighbor extends Step {
    name = "回到邻居面板";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.assist.backToNeighborPos.x, getConfig().guild.assist.backToNeighborPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
    nextStep(ctx: ICtx): string {
        return CheckAssistable.name;
    }
}

export const guildAssistTask: ITask = new BaseTask({
    name: "协助他人",
    businessSteps: {
        OpenManor: new OpenManor(),
        OpenNeighborPanel: new OpenNeighborPanel(),
        CheckAssistable: new CheckAssistable(),
        ClickVisit: new ClickVisit(),
        ClickAssist: new ClickAssist(),
        ClickLike: new ClickLike(),
        BackToNeighbor: new BackToNeighbor(),
    },
});
