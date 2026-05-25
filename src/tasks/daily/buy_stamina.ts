import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { Logger } from "../../utils/logger";
import { OcrHelper } from "../../utils/ocr";
import { ScreenHelper } from "../../utils/screen";
import { BaseTask } from "../base_task";
import { getConfig } from "../../config/loader";

class OpenStaminaPanel extends Step {
    name = "打开体力窗口";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.buyStamina.staminaPos.x, getConfig().daily.buyStamina.staminaPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.buyStamina.supplementTitle);
    }

    nextStep(ctx: ICtx): string {
        return BuyStamina.name;
    }
}

class BuyStamina extends Step {
    name = "点击购买体力";


    action(ctx: ICtx, task: ITask): void {
        // 先点击免费购买体力图标, 体力免费购买次数最多就3次。5次冗余防止没有点到
        let retryCount = 0;
        while (retryCount < 5) {
            if (ScreenHelper.findMultiColors(getConfig().daily.buyStamina.freeBuyStaminaIcon)) {
                Logger.info(this.tag, "点击免费购买体力图标");
                ClickHelper.tap(getConfig().daily.buyStamina.buyStaminaPos.x, getConfig().daily.buyStamina.buyStaminaPos.y);
                sleep(1000);
                ClickHelper.tap(getConfig().daily.buyStamina.buyStaminaPos.x, getConfig().daily.buyStamina.buyStaminaPos.y);
                sleep(500);
                retryCount++;
            } else {
                break;
            }
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const buyStaminaTask: ITask = new BaseTask({
    name: "购买体力",
    businessSteps: {
        OpenStaminaPanel: new OpenStaminaPanel(),
        BuyStamina: new BuyStamina(),
    },
});
