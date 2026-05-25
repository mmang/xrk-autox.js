import { ColorTarget, Point, TextTarget } from "../../types";

export interface EliteConfig {
    eliteChallengePos: Point;
    sweepPos: Point;
    closeSweepPos: Point;
    eliteTitle: TextTarget;
    sweepText: TextTarget;
    limitReached: TextTarget;
    confirmSweepPos: Point;
}

export interface DungeonConfig {
    dailyDungeonPos: Point;
    goldExplorePos: Point;
    goldSweepPos: Point;
    materialExplorePos: Point;
    materialSweepPos: Point;
    goldText: TextTarget;
}

export interface ArenaConfig {
    maxNavigateAttempts: number;
    matchTimeout: number;
    arena: TextTarget;
    quickMatch: TextTarget;
    cancelMatch: TextTarget;
    refresh: TextTarget;
    eliminated: TextTarget;
    winner: TextTarget;
    arenaEntryPos: Point;
}

export interface AbyssConfig {
    abyssLordPos: Point;
    abyssLordTitle: TextTarget;
    saoDangBtn: TextTarget;
    saoDangCount: TextTarget;
    settleBtn: TextTarget;
    saoDangPos: Point;
    confirmSweepPos: Point;
    settlePos: Point;
}

export interface TrialConfig {
    trialLandPos: Point;
    sweepPos: Point;
    freeSweepPos: Point;
    backToPlayPos: Point;
    sweepText: TextTarget;
    limitReached: TextTarget;
}

export interface DungeonCategoryConfig {
    elite: EliteConfig;
    dungeon: DungeonConfig;
    arena: ArenaConfig;
    abyss: AbyssConfig;
    trial: TrialConfig;
}

export const dungeonConfig: DungeonCategoryConfig = {
    elite: {
        eliteChallengePos: { x: 897, y: 1169 },
        sweepPos: { x: 979, y: 1801 },
        closeSweepPos: { x: 945, y: 698 },
        eliteTitle: { desc: "精英挑战标题", text: "精英挑战", region: { x: 432, y: 150, w: 218, h: 74 } },
        sweepText: { desc: "扫荡按钮", text: "扫荡", region: { x: 471, y: 648, w: 145, h: 63 } },
        limitReached: { desc: "已达上限", text: "已达上限", region: { x: 708, y: 917, w: 182, h: 74 } },
        confirmSweepPos: { x: 803, y: 958 },
    },
    dungeon: {
        dailyDungeonPos: { x: 920, y: 291 },
        goldExplorePos: { x: 781, y: 2315 },
        goldSweepPos: { x: 912, y: 1955 },
        materialExplorePos: { x: 955, y: 2305 },
        materialSweepPos: { x: 907, y: 1961 },
        goldText: { desc: "金币", text: "金币", region: { x: 723, y: 2323, w: 111, h: 62 } },
    },
    arena: {
        maxNavigateAttempts: 5,
        matchTimeout: 300000,
        arena: { desc: "竞技对决标题", text: "竞技对决", region: { x: 360, y: 235, w: 377, h: 116 } },
        quickMatch: { desc: "快速匹配按钮", text: "快速匹配", region: { x: 652, y: 2258, w: 221, h: 79 } },
        cancelMatch: { desc: "取消匹配按钮", text: "取消匹配", region: { x: 262, y: 1391, w: 205, h: 76 } },
        refresh: { desc: "刷新(匹配成功)", text: "刷新", region: { x: 509, y: 2312, w: 158, h: 87 } },
        eliminated: { desc: "淘汰提示", text: "淘汰", region: { x: 368, y: 308, w: 304, h: 263 } },
        winner: { desc: "吃鸡提示", text: "吃鸡", region: { x: 368, y: 308, w: 304, h: 263 } },
        arenaEntryPos: { x: 102, y: 2064 },
    },
    abyss: {
        abyssLordPos: { x: 891, y: 857 },
        abyssLordTitle: { desc: "深渊领主标题", text: "深渊领主", region: { x: 357, y: 206, w: 372, h: 107 } },
        saoDangBtn: { desc: "扫荡按钮", text: "扫荡", region: { x: 374, y: 2267, w: 112, h: 67 } },
        saoDangCount: { desc: "扫荡次数", text: "0", region: { x: 847, y: 2171, w: 116, h: 74 } },
        settleBtn: { desc: "结算按钮", text: "确定", region: { x: 425, y: 2092, w: 230, h: 98 } },
        saoDangPos: { x: 446, y: 2303 },
        confirmSweepPos: { x: 739, y: 1435 },
        settlePos: { x: 544, y: 2142 },
    },
    trial: {
        trialLandPos: { x: 904, y: 1720 },
        sweepPos: { x: 800, y: 2317 },
        freeSweepPos: { x: 875, y: 1655 },
        backToPlayPos: { x: 73, y: 2324 },
        sweepText: { desc: "扫荡按钮", text: "扫荡", region: { x: 752, y: 2330, w: 99, h: 59 } },
        limitReached: { desc: "已达上限", text: "已达上限", region: { x: 789, y: 1626, w: 170, h: 70 } },
    },
};
