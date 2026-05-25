import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { OcrHelper } from "../../utils/ocr";
import { BaseTask } from "../base_task";
import { getConfig } from "../../config/loader";

class EnterSummonPage extends Step {
    name = "进入召唤植物页面";

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tapPoint(getConfig().daily.summon.enterSummonPos);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return FindNaturalSummon.name;
    }
}

class FindNaturalSummon extends Step {
    name = "查找自然召唤";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        const match = OcrHelper.findText(getConfig().daily.summon.naturalSummon);
        if (match) {
            ClickHelper.tapCenter(match.bounds);
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    preCheck(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.summon.naturalSummon);
    }

    nextStep(ctx: ICtx): string {
        return CheckAbandonBtn.name;
    }
}

class CheckAbandonBtn extends Step {
    name = "检查放弃按钮";

    canSkip(ctx: ICtx, task: ITask): boolean {
        return !OcrHelper.hasText(getConfig().daily.summon.abandonBtn);
    }

    preCheck(): () => boolean {
        return () => true;
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tapPoint(getConfig().daily.summon.abandonBtnPos);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return DoSummon.name;
    }
}

class DoSummon extends Step {
    name = "召唤";
    confirmAttempts = 10;

    preCheck(): () => boolean {
        return () => OcrHelper.hasText(getConfig().daily.summon.autoSummon);
    }

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tapPoint(getConfig().daily.summon.summonPos);
        sleep(1000);
        ClickHelper.tapPoint(getConfig().daily.summon.closeRewardPos);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return STEP_END;
    }
}

export const summonTask: ITask = new BaseTask({
    name: "自然召唤",
    businessSteps: {
        EnterSummonPage: new EnterSummonPage(),
        FindNaturalSummon: new FindNaturalSummon(),
        CheckAbandonBtn: new CheckAbandonBtn(),
        DoSummon: new DoSummon(),
    },
});
