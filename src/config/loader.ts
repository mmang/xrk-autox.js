import { ScaleHelper } from "../utils/scale_helper";
import { systemConfig } from "./resolutions/1080x2400/system";
import { dailyConfig } from "./resolutions/1080x2400/daily";
import { guildConfig } from "./resolutions/1080x2400/guild";
import { dungeonConfig } from "./resolutions/1080x2400/dungeon";

export interface ResolutionConfig {
    system: typeof systemConfig;
    daily: typeof dailyConfig;
    guild: typeof guildConfig;
    dungeon: typeof dungeonConfig;
}

const CONFIG_1080x2400: ResolutionConfig = {
    system: systemConfig,
    daily: dailyConfig,
    guild: guildConfig,
    dungeon: dungeonConfig,
};

const SUPPORTED_RESOLUTIONS: Record<string, ResolutionConfig> = {
    "1080x2400": CONFIG_1080x2400,
};

let _currentConfig: ResolutionConfig | null = null;

export function initConfig(): void {
    const w = ScaleHelper.screenWidth;
    const h = ScaleHelper.screenHeight;
    const key = `${w}x${h}`;

    const config = SUPPORTED_RESOLUTIONS[key];
    if (!config) {
        const supported = Object.keys(SUPPORTED_RESOLUTIONS).join(", ");
        throw new Error(`分辨率 ${key} 未适配，当前支持的分辨率: ${supported}。请在 src/config/resolutions/${key}/ 下添加配置`);
    }

    _currentConfig = config;
}

export function getConfig(): ResolutionConfig {
    if (!_currentConfig) {
        throw new Error("配置未初始化，请先调用 initConfig()");
    }
    return _currentConfig;
}
