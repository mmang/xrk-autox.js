import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { BaseTask } from "../base_task";
import { getConfig } from "../../config/loader";

class ClickTravel extends Step {
    name = "点击游历";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().daily.travel.travelPos.x, getConfig().daily.travel.travelPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.travel.travelTitle);
    }

    nextStep(ctx: ICtx): string {
        return ClickQuickTravel.name;
    }
}

class ClickQuickTravel extends Step {
    name = "点击快速游历";

    action(ctx: ICtx, task: ITask): void {
        // 执行两次点击快速游历按钮，每日任务只需要游历两次。默认就两次了
        for (let i = 0; i < 2; i++) {
            ClickHelper.tap(getConfig().daily.travel.quickTravelPos.x, getConfig().daily.travel.quickTravelPos.y);
            sleep(500);
            // 第二次是关闭奖励弹窗
            ClickHelper.tap(getConfig().daily.travel.quickTravelPos.x, getConfig().daily.travel.quickTravelPos.y);
            sleep(500);
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const quickTravelTask: ITask = new BaseTask({
    name: "快速游历",
    businessSteps: {
        ClickTravel: new ClickTravel(),
        ClickQuickTravel: new ClickQuickTravel(),
    },
});
