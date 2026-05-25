import { Step, ITask, ICtx } from "../../core/step";
import { BaseTask } from "../base_task";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { ClickPlayTab, ScrollToTop } from "./play_tab_base";
import { getConfig } from "../../config/loader";

class ClickDailyDungeon extends Step {
    name = "点击日常副本";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.dungeon.dailyDungeonPos.x, getConfig().dungeon.dungeon.dailyDungeonPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.dungeon.goldText);
    }

    nextStep(ctx: ICtx): string {
        return GoldExplore.name;
    }
}

class GoldExplore extends Step {
    name = "金币探索";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.dungeon.goldExplorePos.x, getConfig().dungeon.dungeon.goldExplorePos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return GoldSweep.name;
    }
}

class GoldSweep extends Step {
    name = "金币扫荡";
    action(ctx: ICtx, task: ITask): void {
        for (let i = 0; i < 6; i++) {
            ClickHelper.tap(getConfig().dungeon.dungeon.goldSweepPos.x, getConfig().dungeon.dungeon.goldSweepPos.y);
            sleep(1000);
        }
        sleep(2000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return MaterialExplore.name;
    }
}

class MaterialExplore extends Step {
    name = "材料搜寻";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.dungeon.materialExplorePos.x, getConfig().dungeon.dungeon.materialExplorePos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return MaterialSweep.name;
    }
}

class MaterialSweep extends Step {
    name = "材料扫荡";
    action(ctx: ICtx, task: ITask): void {
        for (let i = 0; i < 6; i++) {
            ClickHelper.tap(getConfig().dungeon.dungeon.materialSweepPos.x, getConfig().dungeon.dungeon.materialSweepPos.y);
            sleep(1000);
        }
        sleep(2000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }
}

export const dailyDungeonTask: ITask = new BaseTask({
    name: "日常副本",
    businessSteps: {
        ClickPlayTab: new ClickPlayTab(),
        ScrollToTop: new ScrollToTop(ClickDailyDungeon.name),
        ClickDailyDungeon: new ClickDailyDungeon(),
        GoldExplore: new GoldExplore(),
        GoldSweep: new GoldSweep(),
        MaterialExplore: new MaterialExplore(),
        MaterialSweep: new MaterialSweep(),
    },
});
