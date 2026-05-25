import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { ScreenHelper } from "../../utils/screen";
import { BaseTask } from "../base_task";
import { getConfig } from "../../config/loader";

class EnterWishPage extends Step {
    name = "进入祈愿页面";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tapPoint(getConfig().daily.plantWish.enterWishPos);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return ClickPlantWish.name;
    }
}

class ClickPlantWish extends Step {
    name = "点击植物祈愿";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        const match = OcrHelper.findText(getConfig().daily.plantWish.plantWish);
        if (match) {
            ClickHelper.tapCenter(match.bounds);
        }
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().daily.plantWish.wishResultColor) !== null;
    }

    preCheck(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return FreeWish.name;
    }
}

class FreeWish extends Step {
    name = "点击免费祈愿";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tapPoint(getConfig().daily.plantWish.freeWishPos);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const plantWishTask: ITask = new BaseTask({
    name: "植物祈愿",
    businessSteps: {
        EnterWishPage: new EnterWishPage(),
        ClickPlantWish: new ClickPlantWish(),
        FreeWish: new FreeWish(),
    },
});
