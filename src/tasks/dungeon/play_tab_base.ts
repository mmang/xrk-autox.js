import { Step, ITask, ICtx } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { ScreenHelper } from "../../utils/screen";
import { OcrHelper } from "../../utils/ocr";
import { Logger } from "../../utils/logger";
import { getConfig } from "../../config/loader";

export class ClickPlayTab extends Step {
    name = "点击玩法tab";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().system.playTab.playTabPos.x, getConfig().system.playTab.playTabPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => ScreenHelper.findMultiColors(getConfig().system.playTab.playTabOpened) !== null;
    }
    nextStep(ctx: ICtx): string {
        return ScrollToTop.name;
    }
}

export class ScrollToTop extends Step {
    name = "滑动到顶部";
    private nextStepName: string;

    constructor(nextStepName: string) {
        super();
        this.nextStepName = nextStepName;
    }

    action(ctx: ICtx, task: ITask): void {
        let retries = 0;
        while (!OcrHelper.hasText(getConfig().system.scroll.dailyDungeonText)) {
            if (retries >= getConfig().system.scroll.maxScrollRetries) {
                Logger.error(this.tag, "未找到日常副本，放弃滑动");
                return;
            }
            const scroll = getConfig().system.scroll;
            ScreenHelper.swipe(scroll.swipeStartPos.x, scroll.swipeStartPos.y, scroll.swipeEndPos.x, scroll.swipeEndPos.y, 100);
            sleep(1000);
            retries++;
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}
