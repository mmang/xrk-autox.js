import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { BaseTask } from "../base_task";
import { ScreenHelper } from "../../utils/screen";
import { getConfig } from "../../config/loader";

class OpenFriendPanel extends Step {
    name = "打开好友面板";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.staminaGift.friendPanelPos.x, getConfig().daily.staminaGift.friendPanelPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.staminaGift.receiveStamina);
    }

    nextStep(ctx: ICtx): string {
        return ReceiveStamina.name;
    }
}

class ReceiveStamina extends Step {
    name = "领取体力";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.staminaGift.receiveStaminaPos.x, getConfig().daily.staminaGift.receiveStaminaPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.staminaGift.oneClickReceive);
    }

    nextStep(ctx: ICtx): string {
        return OneClickReceive.name;
    }
}

class OneClickReceive extends Step {
    name = "一键领取";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.staminaGift.oneClickReceivePos.x, getConfig().daily.staminaGift.oneClickReceivePos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().daily.staminaGift.oneClickReceiveColor) !== null;
    }

    nextStep(ctx: ICtx): string {
        return ClosePanel.name;
    }
}

class ClosePanel extends Step {
    name = "关闭一键领取面板";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.staminaGift.closePanelPos.x, getConfig().daily.staminaGift.closePanelPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.staminaGift.receiveStamina);
    }

    nextStep(ctx: ICtx): string {
        return OneClickSend.name;
    }
}

class OneClickSend extends Step {
    name = "一键赠送";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.staminaGift.oneClickSendPos.x, getConfig().daily.staminaGift.oneClickSendPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const staminaGiftTask: ITask = new BaseTask({
    name: "赠送/领取体力",
    businessSteps: {
        OpenFriendPanel: new OpenFriendPanel(),
        ReceiveStamina: new ReceiveStamina(),
        OneClickReceive: new OneClickReceive(),
        ClosePanel: new ClosePanel(),
        OneClickSend: new OneClickSend(),
    },
});
