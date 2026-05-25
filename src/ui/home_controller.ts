import { runTaskChain, createContext, ITaskChainItem, stopEngine } from "../core/engine";
import { createLaunchGameTask } from "../tasks/system/launch_game";
import { createArenaTask } from "../tasks/dungeon/arena";
import { dailyDungeonTask } from "../tasks/dungeon/daily_dungeon";
import { abyssLordTask } from "../tasks/dungeon/abyss_lord";
import { eliteChallengeTask } from "../tasks/dungeon/elite_challenge";
import { trialLandTask } from "../tasks/dungeon/trial_land";
import { guildHuntTask } from "../tasks/guild/guild_hunt";
import { guildDonateTask } from "../tasks/guild/guild_donate";
import { guildChatTask } from "../tasks/guild/guild_chat";
import { guildAssistTask } from "../tasks/guild/guild_assist";
import { staminaGiftTask } from "../tasks/daily/stamina_gift";
import { mainStageTask } from "../tasks/daily/main_stage";
import { quickTravelTask } from "../tasks/daily/quick_travel";
import { buyStaminaTask } from "../tasks/daily/buy_stamina";
import { summonTask } from "../tasks/daily/summon";
import { plantWishTask } from "../tasks/daily/plant_wish";
import { DualAppMode } from "../tasks/game_base";
import { ScaleHelper } from "../utils/scale_helper";
import { PermissionHelper } from "../utils/permission";
import { LogPage } from "./log_page";
import { initConfig } from "../config/loader";

const CATEGORIES: { catAllId: string; taskIds: string[] }[] = [
    {
        catAllId: "catAll_arena",
        taskIds: ["chk_单人匹配", "chk_组队匹配"],
    },
    {
        catAllId: "catAll_daily",
        taskIds: ["chk_精彩活动", "chk_签到福利", "chk_主线关卡", "chk_快速游历", "chk_购买体力", "chk_赠送领取体力", "chk_商店购物", "chk_商店购买1次", "chk_植物升级", "chk_自然召唤", "chk_植物祈愿", "chk_点赞其他玩家", "chk_装备升级分解"],
    },
    {
        catAllId: "catAll_guild",
        taskIds: ["chk_猎魔入侵", "chk_工会捐献", "chk_工会发言", "chk_协助他人"],
    },
    {
        catAllId: "catAll_dungeon",
        taskIds: ["chk_日常副本", "chk_深渊领主", "chk_精英挑战", "chk_试炼之地", "chk_巅峰对决"],
    },
];

const ALL_TASK_IDS: string[] = CATEGORIES.flatMap(c => c.taskIds);
const ALL_CAT_IDS: string[] = CATEGORIES.map(c => c.catAllId);

const UNIMPLEMENTED_TASK_IDS: string[] = [
    "chk_精彩活动",
    "chk_签到福利",
    "chk_组队匹配",
    "chk_巅峰对决",
    "chk_商店购物",
    "chk_商店购买1次",
    "chk_植物升级",
    "chk_点赞其他玩家",
    "chk_装备升级分解",
];

const RUNS_INPUT_IDS: string[] = ["runs_主线关卡", "runs_单人匹配"];

const TASK_CREATORS: Record<string, (w: any) => ITaskChainItem> = {
    "chk_单人匹配": (w) => {
        const input = w["runs_单人匹配"];
        const totalRuns = input ? parseInt(input.text(), 10) : 1;
        return { task: createArenaTask(totalRuns > 0 ? totalRuns : 1) };
    },
    "chk_日常副本": () => ({ task: dailyDungeonTask }),
    "chk_深渊领主": () => ({ task: abyssLordTask }),
    "chk_精英挑战": () => ({ task: eliteChallengeTask }),
    "chk_试炼之地": () => ({ task: trialLandTask }),
    "chk_猎魔入侵": () => ({ task: guildHuntTask }),
    "chk_工会捐献": () => ({ task: guildDonateTask }),
    "chk_工会发言": () => ({ task: guildChatTask }),
    "chk_协助他人": () => ({ task: guildAssistTask }),
    "chk_赠送领取体力": () => ({ task: staminaGiftTask }),
    "chk_主线关卡": (w) => {
        const input = w["runs_主线关卡"];
        const runs = input ? parseInt(input.text(), 10) : 1;
        return { task: mainStageTask, runs: runs > 0 ? runs : 1 };
    },
    "chk_快速游历": () => ({ task: quickTravelTask }),
    "chk_购买体力": () => ({ task: buyStaminaTask }),
    "chk_自然召唤": () => ({ task: summonTask }),
    "chk_植物祈愿": () => ({ task: plantWishTask }),
};

function taskNameFromId(id: string): string {
    return id.replace(/^chk_/, "");
}

export class HomeController {
    private _isRunning: boolean = false;

    onBind(w: any, onBackFromLog?: () => void): void {
        this.bindCategoryCheckboxes(w);
        this.bindRunButton(w);
        this.bindStopButton(w);
        this.bindOpenLogButton(w, onBackFromLog);
        this.disableUnimplementedTasks(w);
    }

    private disableUnimplementedTasks(w: any): void {
        for (const id of UNIMPLEMENTED_TASK_IDS) {
            const cb = w[id];
            if (cb) {
                cb.setEnabled(false);
                cb.setChecked(false);
            }
        }
    }

    private bindCategoryCheckboxes(w: any): void {
        const isUnimplemented = (id: string) => UNIMPLEMENTED_TASK_IDS.includes(id);
        for (const cat of CATEGORIES) {
            const catCheckbox = w[cat.catAllId];
            const implementedIds = cat.taskIds.filter(id => !isUnimplemented(id));
            if (catCheckbox) {
                catCheckbox.on("check", (checked: boolean) => {
                    for (const taskId of implementedIds) {
                        const cb = w[taskId];
                        if (cb) cb.setChecked(checked);
                    }
                });
            }
            for (const taskId of cat.taskIds) {
                const cb = w[taskId];
                if (cb) {
                    cb.on("check", () => {
                        const allChecked = implementedIds.every(id => w[id] && w[id].checked);
                        if (catCheckbox) catCheckbox.setChecked(allChecked);
                    });
                }
            }
        }
    }

    private bindRunButton(w: any): void {
        const self = this;
        w.btnRun.click(() => {
            if (self._isRunning) return;

            const checkedIds = ALL_TASK_IDS.filter(id => w[id] && w[id].checked);
            if (checkedIds.length === 0) {
                toast("请至少勾选一个任务");
                return;
            }

            // 立即设置运行状态，防止快速点击导致重复启动
            self._isRunning = true;
            w.statusText.setText("检查权限...");

            threads.start(function () {
                if (!PermissionHelper.waitForAccessibility()) {
                    ui.run(function () {
                        toast("请先开启无障碍服务");
                        w.statusText.setText("无障碍服务未开启");
                        self._isRunning = false;
                    });
                    return;
                }

                if (!PermissionHelper.requestScreenCapture()) {
                    ui.run(function () {
                        toast("截图权限获取失败，请重新运行并授权");
                        w.statusText.setText("截图权限未获取");
                        self._isRunning = false;
                    });
                    return;
                }

                ScaleHelper.init();
                initConfig();
                setScreenMetrics(ScaleHelper.screenWidth, ScaleHelper.screenHeight);

                ui.run(function () {
                    self.setUIEnabled(w, false);
                    w.progressBar.setVisibility(0);
                    w.statusText.setText("运行中...");
                });

                try {
                    const chain = self.buildChain(w, checkedIds);
                    runTaskChain(chain, createContext());
                } finally {
                    ui.run(function () {
                        self._isRunning = false;
                        self.setUIEnabled(w, true);
                        w.statusText.setText("全部完成");
                        w.progressBar.setVisibility(8);
                    });
                }
            });
        });
    }

    private bindStopButton(w: any): void {
        const self = this;
        w.btnStop.click(() => {
            stopEngine();
            self._isRunning = false;
            self.setUIEnabled(w, true);
            w.statusText.setText("已停止");
            w.progressBar.setVisibility(8);
            exit();
        });
    }

    private bindOpenLogButton(_w: any, onBackFromLog?: () => void): void {
        _w.btnOpenLog.click(() => {
            new LogPage().show(onBackFromLog);
        });
    }

    private buildChain(w: any, checkedIds: string[]): ITaskChainItem[] {
        const chain: ITaskChainItem[] = [];
        const dualAppMode = this.readDualAppMode(w);
        chain.push({ task: createLaunchGameTask(dualAppMode) });

        for (const id of checkedIds) {
            const creator = TASK_CREATORS[id];
            if (!creator) {
                toast(`任务"${taskNameFromId(id)}"尚未实现，跳过`);
                continue;
            }
            chain.push(creator(w));
        }

        return chain;
    }

    private readDualAppMode(w: any): DualAppMode {
        const spinner = w.spinner_dualApp;
        if (!spinner) return DualAppMode.NONE;
        const idx = spinner.getSelectedItemPosition();
        if (idx === 1) return DualAppMode.DUAL1;
        if (idx === 2) return DualAppMode.DUAL2;
        return DualAppMode.NONE;
    }

    private setUIEnabled(w: any, enabled: boolean): void {
        w.btnRun.setEnabled(enabled);
        for (const id of ALL_TASK_IDS) {
            const cb = w[id];
            if (cb) cb.setEnabled(enabled && !UNIMPLEMENTED_TASK_IDS.includes(id));
        }
        for (const id of ALL_CAT_IDS) {
            const cb = w[id];
            if (cb) cb.setEnabled(enabled);
        }
        for (const inputId of RUNS_INPUT_IDS) {
            const input = w[inputId];
            if (input) input.setEnabled(enabled);
        }
        w.progressBar.setVisibility(enabled ? 8 : 0);
    }
}
