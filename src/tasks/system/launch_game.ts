import { ITask } from "../../core/step";
import { BaseTask } from "../base_task";
import { DualAppMode } from "../game_base";

export function createLaunchGameTask(dualAppMode: DualAppMode = DualAppMode.NONE): ITask {
    return new BaseTask({
        name: "启动进游戏",
        skipHomeCheck: true,
        dualAppMode,
    });
}
