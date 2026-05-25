import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { ScreenHelper } from "../../utils/screen";
import { Logger } from "../../utils/logger";
import { OcrHelper } from "../../utils/ocr";
import { getConfig } from "../../config/loader";
import { BaseTask } from "../base_task";
import { recycleImage } from "../../utils/image";

class OpenGuild extends Step {
    name = "打开工会";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.hunt.guildTabPos.x, getConfig().guild.hunt.guildTabPos.y);
        sleep(1000);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.hunt.guildHall);
    }

    nextStep(ctx: ICtx): string {
        return EnterHunt.name;
    }
}

class EnterHunt extends Step {
    name = "进入猎魔入侵";
    confirmAttempts = 10;
    nextStepName: string = ClickChallenge.name;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.hunt.huntEntryPos.x, getConfig().guild.hunt.huntEntryPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => {
            const img = ScreenHelper.tryCapture();
            if (!img) return false;
            try {
                if (OcrHelper.hasText(getConfig().guild.hunt.dailySettle, img)) {
                    Logger.info(this.tag, "检测到每日结算，无需操作");
                    this.nextStepName = STEP_END;
                    return true;
                }
                return OcrHelper.hasText(getConfig().guild.hunt.challenge, img);
            } finally {
                recycleImage(img);
            }
        };
    }

    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

class ClickChallenge extends Step {
    name = "点击挑战";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.hunt.challengePos.x, getConfig().guild.hunt.challengePos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.hunt.startChallenge);
    }

    nextStep(ctx: ICtx): string {
        return CheckDeploy.name;
    }
}

class CheckDeploy extends Step {
    name = "检查上阵状态";
    nextStepName: string = CheckPlantCount.name;

    action(ctx: ICtx, task: ITask): void {
        const img = ScreenHelper.tryCapture();
        if (!img) return;
        try {

            if (OcrHelper.hasText(getConfig().guild.hunt.undeployBtn, img)) {
                Logger.info(this.tag, "检测到一键下阵，点击下阵");
                ClickHelper.tap(getConfig().guild.hunt.autoDeployPos.x, getConfig().guild.hunt.autoDeployPos.y);
                sleep(1000);
                Logger.info(this.tag, "点击上阵");
                ClickHelper.tap(getConfig().guild.hunt.autoDeployPos.x, getConfig().guild.hunt.autoDeployPos.y);
                sleep(1000);
            } else if (OcrHelper.hasText(getConfig().guild.hunt.deployBtn, img)) {
                Logger.info(this.tag, "检测到一键上阵，点击上阵");
                ClickHelper.tap(getConfig().guild.hunt.autoDeployPos.x, getConfig().guild.hunt.autoDeployPos.y);
                sleep(1000);
            } else {
                Logger.info(this.tag, "未检测到上阵/下阵按钮");
            }
        } finally {
            recycleImage(img);
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

class CheckPlantCount extends Step {
    name = "检查植物数量";
    nextStepName: string = StartChallenge.name;

    action(ctx: ICtx, task: ITask): void {
        const img = ScreenHelper.tryCapture();
        if (!img) return;
        try {
            const hasFullPlants = OcrHelper.hasTextExact(getConfig().guild.hunt.plantCount, img);
            if (hasFullPlants) {
                Logger.info(this.tag, "植物已满6/6，可以开始挑战");
                this.nextStepName = StartChallenge.name;
            } else {
                Logger.info(this.tag, "植物不足6/6，尝试复活退场植物");
                this.nextStepName = RevivePlants.name;
            }
        } finally {
            recycleImage(img);
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

class StartChallenge extends Step {
    name = "开始挑战";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.hunt.startChallengePos.x, getConfig().guild.hunt.startChallengePos.y);
        sleep(3000);
        const ocrConfirm = OcrHelper.findText(getConfig().guild.hunt.confirmStartChallenge);
        if (ocrConfirm) {
            Logger.info(this.tag, "检测到确认开始挑战按钮");
            ClickHelper.tap(ocrConfirm.bounds.centerX(), ocrConfirm.bounds.centerY());
            sleep(2000);
        }
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.hunt.autoReleaseSkill);
    }

    nextStep(ctx: ICtx): string {
        return InBattle.name;
    }
}


class InBattle extends Step {
    name = "挑战中";

    action(ctx: ICtx, task: ITask): void {
        while (true) {
            if (OcrHelper.hasText(getConfig().guild.hunt.autoReleaseSkill)) {
                Logger.info(this.tag, "检测到自动释放技能");
            } else {
                Logger.info(this.tag, "未检测到自动释放技能，挑战结束");
                break;
            }
            sleep(10000);
        }

    }


    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.hunt.challengeEnd);
    }

    nextStep(ctx: ICtx): string {
        return BackToChallenge.name;
    }
}

class BackToChallenge extends Step {
    name = "返回挑战页面";
    confirmAttempts = 10;

    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().guild.hunt.backToChallengePos.x, getConfig().guild.hunt.backToChallengePos.y);
        sleep(3000);
        Logger.error(this.tag, "返回挑战页面失败");
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().guild.hunt.challenge);
    }

    nextStep(ctx: ICtx): string {
        return ClickChallenge.name;
    }
}

class RevivePlants extends Step {
    name = "复活退场植物";

    action(ctx: ICtx, task: ITask): void {
        const result = ScreenHelper.findMultiColors(getConfig().guild.hunt.reviveBtnColor);
        if (result) {
            Logger.info(this.tag, "复活按钮可点击，点击复活");
            ClickHelper.tap(result.x, result.y);
            sleep(1000);
        } else {
            Logger.info(this.tag, "复活按钮不可点击，没有可复活的植物");
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        return STEP_END;
    }
}

export const guildHuntTask: ITask = new BaseTask({
    name: "猎魔入侵",
    businessSteps: {
        OpenGuild: new OpenGuild(),
        EnterHunt: new EnterHunt(),
        ClickChallenge: new ClickChallenge(),
        CheckDeploy: new CheckDeploy(),
        CheckPlantCount: new CheckPlantCount(),
        StartChallenge: new StartChallenge(),
        InBattle: new InBattle(),
        BackToChallenge: new BackToChallenge(),
        RevivePlants: new RevivePlants(),
    },
});
