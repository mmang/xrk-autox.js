import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { BaseTask } from "../base_task";
import { OcrHelper } from "../../utils/ocr";
import { ClickHelper } from "../../utils/click";
import { ScreenHelper } from "../../utils/screen";
import { Logger } from "../../utils/logger";
import { getConfig } from "../../config/loader";

class ClickChannelEntry extends Step {
    name = "点击频道入口";
    confirmTimeout = 5000;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.chat.channelEntryPos.x, getConfig().guild.chat.channelEntryPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().guild.chat.channelOpened) !== null;
    }

    nextStep(ctx: ICtx): string {
        return SelectGuildChannel.name;
    }
}

class SelectGuildChannel extends Step {
    name = "选择工会频道";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.chat.guildChannelPos.x, getConfig().guild.chat.guildChannelPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().guild.chat.guildChannelSelected) !== null;
    }

    nextStep(ctx: ICtx): string {
        return ClickInputBox.name;
    }
}

class ClickInputBox extends Step {
    name = "点击输入框";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.chat.inputBoxPos.x, getConfig().guild.chat.inputBoxPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return ClickEmoji.name;
    }
}

class ClickEmoji extends Step {
    name = "点击表情";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.chat.emojiPos.x, getConfig().guild.chat.emojiPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return ClickSend.name;
    }
}

class ClickSend extends Step {
    name = "点击发送";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.chat.sendBtnPos.x, getConfig().guild.chat.sendBtnPos.y);
        sleep(1000);
        ClickHelper.tap(getConfig().guild.chat.sendBtnPos.x, getConfig().guild.chat.sendBtnPos.y);
        sleep(1500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.chat.inputPlaceholder);
    }

    nextStep(ctx: ICtx): string {
        return CloseWindow.name;
    }
}

class CloseWindow extends Step {
    name = "关闭窗口";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.chat.closeBtnPos.x, getConfig().guild.chat.closeBtnPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const guildChatTask: ITask = new BaseTask({
    name: "工会发言",
    businessSteps: {
        ClickChannelEntry: new ClickChannelEntry(),
        SelectGuildChannel: new SelectGuildChannel(),
        ClickInputBox: new ClickInputBox(),
        ClickEmoji: new ClickEmoji(),
        ClickSend: new ClickSend(),
        CloseWindow: new CloseWindow(),
    },
});
