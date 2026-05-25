import { Step, HomeStep, ITask, ICtx, STEP_END } from "../core/step";
import { ClickHelper } from "../utils/click";
import { ScreenHelper } from "../utils/screen";
import { Logger } from "../utils/logger";
import { OcrHelper } from "../utils/ocr";
import { recycleImage } from "../utils/image";
import { getConfig } from "../config/loader";
import { ScaleHelper } from "../utils/scale_helper";

export enum AppState {
    UNKNOWN = 0,
    LOGIN = 1,
    LOBBY = 2,
    IN_APP = 3,
    ANNOUNCE = 4,
    LOBBY_CONFIRMED = 5,
}



const TAG = "GameBase";

export class GameHome extends HomeStep {
    name = "游戏大厅";
    nextStepName: string = STEP_END;
    action(ctx: ICtx, task: ITask): void { }
    nextStep(ctx: ICtx): string {
        return this.nextStepName;
    }
}

export class LaunchApp extends Step {
    name = "启动应用";
    action(ctx: ICtx, task: ITask): void {
        // 判断是否在当前应用中
        if (currentPackage() !== task.packageName) {
            launch(task.packageName);
            Logger.info(TAG, "等待应用启动完成");
            sleep(getConfig().system.game.launchDelay);
        }

    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        if (currentPackage() === getConfig().system.game.packageName) {
            // 启动时，如果是在当前应用，代表游戏已经启动，直接跳转大厅页面
            return NavigateToLobby.name;
        }
        return HandleDualApp.name;
    }
}

export const DualAppMode = {
    NONE: 0,
    DUAL1: 1,
    DUAL2: 2,
} as const;

export type DualAppMode = typeof DualAppMode[keyof typeof DualAppMode];

export class HandleDualApp extends Step {
    private _mode: DualAppMode;
    name = "处理双开";

    constructor(mode: DualAppMode = DualAppMode.NONE) {
        super();
        this._mode = mode;
    }

    canSkip(ctx: ICtx, task: ITask): boolean {
        // 不需要双开，直接启动app即可
        if (this._mode === DualAppMode.NONE) return true;
        // 如果当前应用是游戏应用，代表游戏已经启动，直接下一步
        if (currentPackage() === getConfig().system.game.packageName) {
            sleep(3000);
            return true;
        }
        return false;
    }

    action(ctx: ICtx, task: ITask): void {
        // 不需要双开，直接启动app即可
        if (this._mode === DualAppMode.NONE) {
            Logger.info(TAG, "不需要双开，直接启动app");
            return;
        };

        Logger.info(TAG, "等待应用启动完成");
        // 点击双开的第一个位置
        if (this._mode === DualAppMode.DUAL1) {
            const dualApp = getConfig().system.game.dualApp;
            const match = OcrHelper.findText(dualApp);
            if (match) {
                Logger.info(TAG, "检测到双开选择，点击应用1");
                ClickHelper.tapCenter(match.bounds);
                sleep(getConfig().system.game.dualAppDelay);
                Logger.info(TAG, "等待应用启动完成");
            } else {
                Logger.error(TAG, "未检测到双开1选择");
                sleep(1000);
            }
        }

        // 点击双开的第二个位置
        if (this._mode === DualAppMode.DUAL2) {
            Logger.info(TAG, "检测到双开选择，点击应用2");
            // TODO: 双开2逻辑
            ClickHelper.tap(getConfig().system.game.dualApp2Pos.x, getConfig().system.game.dualApp2Pos.y);
            sleep(getConfig().system.game.dualAppDelay);
        }

        Logger.info(TAG, "应用启动完成");
    }
    confirmCondition(): () => boolean {
        return () => true;
    }
    nextStep(ctx: ICtx): string {
        return NavigateToLobby.name;
    }
}

export class CloseAnnounce extends Step {
    name = "关闭公告";
    action(ctx: ICtx, task: ITask): void {






        const match = OcrHelper.findText(getConfig().system.game.announce);
        if (match) {
            Logger.info(TAG, "检测到公告弹窗，点击关闭");
            ClickHelper.tapCenter(match.bounds);
        }
    }
    confirmCondition(): () => boolean {
        return () => true;
    }
    nextStep(ctx: ICtx): string {
        return EnterGame.name;
    }
}

export class EnterGame extends Step {
    name = "进入游戏";
    action(ctx: ICtx, task: ITask): void {
        ClickHelper.tap(getConfig().system.game.enterGamePos.x, getConfig().system.game.enterGamePos.y);
        sleep(300);
        ClickHelper.tap(getConfig().system.game.enterGamePos.x, getConfig().system.game.enterGamePos.y);
        sleep(6000);
    }
    confirmCondition(): () => boolean {
        return () => OcrHelper.hasText(getConfig().system.game.lobby);
    }
    nextStep(ctx: ICtx): string {
        return NavigateToLobby.name;
    }
}

export class GoHomePage extends Step {
    name = "返回主页";
    action(ctx: ICtx, task: ITask): void {
        // 检查主页tab颜色是否选中
        let attempt = getConfig().system.game.maxNavigateAttempts;
        while (true) {
            if (isLobbyConfirmed()) {
                Logger.info(TAG, "检测到主页tab，返回主页成功");
                break;
            }
            // 返回一次
            Logger.info(TAG, "返回" + (attempt + "次"));

            const match = ScreenHelper.findMultiColors(getConfig().system.game.backBtnColor);
            if (match) {
                Logger.info(TAG, "检测到返回按钮，点击返回");
                ClickHelper.tap(match.x, match.y);
                sleep(500);
                break;
            } else {
                back();
            }
            attempt--;
            sleep(1000);
            if (attempt <= 0) {
                Logger.error(TAG, "返回主页失败，超过最大尝试次数");
                throw new Error("返回主页失败，超过最大尝试次数");
            }
        }
    }
    confirmCondition(): () => boolean {
        return () => true;
    }
    nextStep(ctx: ICtx): string {
        return GameHome.name;
    }
}

export class NavigateToLobby extends Step {
    name = "导航至大厅";
    confirmAttempts = 10;
    nextStepName: string = GameHome.name;

    action(ctx: ICtx, task: ITask): void {
        /**
         * 这个步骤是为了应用在后台热启动时，能够执行到正确的步骤
         * 有几种情况
         * 1. 冷启动，完整的进入游戏主界面流程
         * 2. 热启动，打开游戏后，显示的是在大厅页面，并且没有弹窗，就是最终页面
         * 3. 热启动，打开游戏后，显示的是在子页面，需要返回到大厅页面
         * 4. 热启动，打开游戏后，显示的是在大厅页面，但是有弹窗，需要关闭弹窗。
         *
         * */

        let attempt = 3;
        this.nextStepName = CloseAnnounce.name;
        let lastState = AppState.UNKNOWN;
        while (attempt > 0) {
            const state = this.detectState();
            if (state === lastState) {
                attempt--;
                sleep(1000);
                continue;
            }
            lastState = state;
            switch (state) {
                case AppState.ANNOUNCE:
                    Logger.info(TAG, "检测到公告弹窗，点击关闭");
                    this.nextStepName = CloseAnnounce.name;
                    return;
                case AppState.LOGIN:
                    Logger.info(TAG, "登录页，点击进入游戏");
                    this.nextStepName = EnterGame.name;
                    return;
                case AppState.LOBBY:
                    Logger.info(TAG, "大厅页面，关闭弹窗");
                    this.nextStepName = GoHomePage.name;
                    return;
                case AppState.IN_APP:
                    Logger.info(TAG, "子页面，返回");
                    this.nextStepName = GoHomePage.name;
                    return;
                case AppState.LOBBY_CONFIRMED:
                    Logger.info(TAG, "已确认到达大厅");
                    this.nextStepName = GameHome.name;
                    return;
                default:
                    Logger.info(TAG, "未检测到状态，重试...");
                    sleep(1000);
                    attempt--;
                    break;
            }
        }
        throw new Error("未能导航至游戏大厅");
    }

    confirmCondition(): () => boolean {
        return () => true;
    }

    nextStep(ctx: ICtx): string {
        console.log(TAG, "下一个步骤:", this.nextStepName);
        return this.nextStepName;
    }

    detectState(): AppState {
        const img = ScreenHelper.tryCapture();
        if (img) {
            try {
                const region = getConfig().system.game.announce.region!;
                const clipped = images.clip(img!, region.x, region.y, region.w, region.h);
                images.save(clipped, "/sdcard/announce.png");

                if (OcrHelper.hasText(getConfig().system.game.announce, img)) {
                    Logger.info(TAG, "检测到公告弹窗");
                    return AppState.ANNOUNCE;
                }

                if (OcrHelper.hasText(getConfig().system.game.enterGame, img)) {
                    Logger.info(TAG, "检测到登录页进入游戏按钮");
                    return AppState.LOGIN;
                }
                const result = ScreenHelper.findMultiColorsInImg(img, getConfig().system.game.lobbyColor);
                if (result) {
                    Logger.info(TAG, "检测到大厅底部主tab已选中");
                    return AppState.LOBBY_CONFIRMED;
                }

                if (OcrHelper.hasText(getConfig().system.game.lobby, img)) {
                    Logger.info(TAG, "检测到大厅底部商城按钮");
                    return AppState.LOBBY;
                }

            } finally {
                recycleImage(img);
            }
        }

        if (currentPackage() === getConfig().system.game.packageName) {
            Logger.info(TAG, "检测到子页面");
            return AppState.IN_APP;
        }

        Logger.info(TAG, "未检测到状态");
        return AppState.UNKNOWN;
    }
}

export function isLobbyConfirmed(): boolean {
    const img = ScreenHelper.tryCapture();
    if (img) {
        try {
            const result = ScreenHelper.findMultiColorsInImg(img, getConfig().system.game.lobbyColor);
            return result !== null;
        } finally {
            recycleImage(img);
        }
    }
    return false;
}

export function createBaseSteps(gameHomeNextStep: string = STEP_END, dualAppMode: DualAppMode = DualAppMode.NONE): Record<string, Step> {
    const gameHome = new GameHome();
    gameHome.nextStepName = gameHomeNextStep;
    return {
        LaunchApp: new LaunchApp(),
        HandleDualApp: new HandleDualApp(dualAppMode),
        CloseAnnounce: new CloseAnnounce(),
        EnterGame: new EnterGame(),
        NavigateToLobby: new NavigateToLobby(),
        GameHome: gameHome,
        GoHomePage: new GoHomePage(),
    };
}
