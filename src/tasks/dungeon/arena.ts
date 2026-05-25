import { Step, ITask, ICtx, STEP_END } from "../../core/step";
import { ClickHelper } from "../../utils/click";
import { ScreenHelper } from "../../utils/screen";
import { Logger } from "../../utils/logger";
import { OcrHelper } from "../../utils/ocr";
import { BaseTask } from "../base_task";
import { recycleImage } from "../../utils/image";
import { getConfig } from "../../config/loader";

enum ArenaState {
    UNKNOWN = 0,
    ARENA_SOLO = 1,
    ARENA_OTHER = 2,
    NOT_ARENA = 3,
}

interface ArenaRunState {
    totalRuns: number;
    currentRound: number;
}

class OpenArena extends Step {
    name = "打开竞技对决";
    confirmAttempts = 10;

    constructor(private runState: ArenaRunState) {
        super();
    }

    canSkip(_ctx: ICtx, _task: ITask): boolean {
        return this.runState.currentRound > 0;
    }

    action(_ctx: ICtx, _task: ITask): void {
        ClickHelper.tap(getConfig().dungeon.arena.arenaEntryPos.x, getConfig().dungeon.arena.arenaEntryPos.y);
        sleep(500);
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.arena.arena);
    }

    nextStep(_ctx: ICtx): string {
        this.runState.currentRound = 1;
        return SelectSoloMode.name;
    }
}

class SelectSoloMode extends Step {
    name = "选择单人模式";
    confirmAttempts = 10;
    nextStepName: string = Matching.name;

    action(_ctx: ICtx, _task: ITask): void {
        let attempt = getConfig().dungeon.arena.maxNavigateAttempts;
        let lastState = ArenaState.UNKNOWN;

        while (attempt > 0) {
            const state = this.detectArenaState();
            if (state === lastState) {
                attempt--;
                sleep(1000);
                continue;
            }
            lastState = state;

            switch (state) {
                case ArenaState.ARENA_SOLO:
                    Logger.info(this.tag, "检测到快速匹配按钮，点击");
                    const match = OcrHelper.findText(getConfig().dungeon.arena.quickMatch);
                    if (match) {
                        ClickHelper.tapCenter(match.bounds);
                    }
                    this.nextStepName = Matching.name;
                    return;
                case ArenaState.ARENA_OTHER:
                    Logger.info(this.tag, "在竞技对决页但非单人模式，返回");
                    back();
                    sleep(500);
                    break;
                case ArenaState.NOT_ARENA:
                    Logger.info(this.tag, "不在竞技对决页，需要恢复");
                    throw new Error("不在竞技对决页，需要恢复");
                default:
                    Logger.info(this.tag, "未检测到状态，重试...");
                    sleep(1000);
                    attempt--;
                    break;
            }
        }
        throw new Error("未能导航至单人匹配模式");
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(_ctx: ICtx): string {
        return this.nextStepName;
    }

    detectArenaState(): ArenaState {
        const img = ScreenHelper.tryCapture();
        if (img) {
            try {
                if (OcrHelper.hasText(getConfig().dungeon.arena.quickMatch, img)) {
                    Logger.info(this.tag, "检测到快速匹配按钮");
                    return ArenaState.ARENA_SOLO;
                }
                if (OcrHelper.hasText(getConfig().dungeon.arena.arena, img)) {
                    Logger.info(this.tag, "检测到竞技对决页面");
                    return ArenaState.ARENA_OTHER;
                }
            } finally {
                recycleImage(img);
            }
        }
        Logger.info(this.tag, "未检测到竞技对决相关内容");
        return ArenaState.NOT_ARENA;
    }
}

class Matching extends Step {
    name = "匹配中";
    nextStepName: string = InGame.name;

    action(_ctx: ICtx, _task: ITask): void {
        this.nextStepName = InGame.name;
        const startTime = Date.now();

        while (Date.now() - startTime < getConfig().dungeon.arena.matchTimeout) {
            const img = ScreenHelper.tryCapture();
            if (img) {
                try {
                    if (OcrHelper.hasText(getConfig().dungeon.arena.refresh, img)) {
                        Logger.info(this.tag, "匹配成功，检测到刷新");
                        this.nextStepName = InGame.name;
                        return;
                    }
                    if (!OcrHelper.hasText(getConfig().dungeon.arena.cancelMatch, img)) {
                        Logger.error(this.tag, "匹配被意外取消（可能网络异常）");
                        throw new Error("匹配被意外取消");
                    }
                } finally {
                    recycleImage(img);
                }
            }
            sleep(5000);
        }

        Logger.info(this.tag, "匹配超时，取消匹配");
        const cancelMatch = OcrHelper.findText(getConfig().dungeon.arena.cancelMatch);
        if (cancelMatch) {
            ClickHelper.tapCenter(cancelMatch.bounds);
        }
        this.nextStepName = SelectSoloMode.name;
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(_ctx: ICtx): string {
        return this.nextStepName;
    }
}

class InGame extends Step {
    name = "游戏中";
    action(_ctx: ICtx, _task: ITask): void {
        while (true) {
            if (OcrHelper.hasText(getConfig().dungeon.arena.eliminated) || OcrHelper.hasText(getConfig().dungeon.arena.winner)) {
                Logger.info(this.tag, "游戏结束");
                return;
            }
            sleep(3000);
        }
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(_ctx: ICtx): string {
        return BackToArena.name;
    }
}

class BackToArena extends Step {
    name = "返回竞技对决主页";
    confirmAttempts = 10;

    constructor(private runState: ArenaRunState) {
        super();
    }

    action(_ctx: ICtx, _task: ITask): void {
        for (let i = 0; i < 3; i++) {
            back();
            sleep(500);
        }
    }

    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().dungeon.arena.arena);
    }

    nextStep(_ctx: ICtx): string {
        this.runState.currentRound++;
        if (this.runState.currentRound <= this.runState.totalRuns) {
            return SelectSoloMode.name;
        }
        return STEP_END;
    }
}

class ArenaTask extends BaseTask {
    constructor(config: { totalRuns?: number } = {}) {
        const totalRuns = config.totalRuns || 1;
        const runState: ArenaRunState = { totalRuns, currentRound: 0 };
        super({
            name: "单人匹配",
            businessSteps: {
                OpenArena: new OpenArena(runState),
                SelectSoloMode: new SelectSoloMode(),
                Matching: new Matching(),
                InGame: new InGame(),
                BackToArena: new BackToArena(runState),
            },
        });
    }
}

export function createArenaTask(totalRuns: number = 1): ArenaTask {
    return new ArenaTask({ totalRuns });
}
