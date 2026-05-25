import { ColorTarget, Point, TextTarget } from "../../types";

export interface HuntConfig {
    guildTabPos: Point;
    huntEntryPos: Point;
    challengePos: Point;
    autoDeployPos: Point;
    startChallengePos: Point;
    guildHall: TextTarget;
    challenge: TextTarget;
    startChallenge: TextTarget;
    confirmStartChallenge: TextTarget;
    deployBtn: TextTarget;
    undeployBtn: TextTarget;
    plantCount: TextTarget;
    dailySettle: TextTarget;
    challengeEnd: TextTarget;
    autoReleaseSkill: TextTarget;
    reviveBtnColor: ColorTarget;
    battleCheckInterval: number;
    maxBackAttempts: number;
    backToChallengePos: Point;
}

export interface DonateConfig {
    guildTabPos: Point;
    donateEntryPos: Point;
    goldDonateBtnPos: Point;
    confirmDonatePos: Point;
    closePopupPos: Point;
    donateBtnRedDot: ColorTarget;
    guildHall: TextTarget;
    donateBtn: TextTarget;
    donateSuccess: TextTarget;
    goldDonate: TextTarget;
    confirmBtn: TextTarget;
    closeBtn: TextTarget;
    donateLimit: TextTarget;
}

export interface ChatConfig {
    channelEntryPos: Point;
    guildChannelPos: Point;
    inputBoxPos: Point;
    emojiPos: Point;
    sendBtnPos: Point;
    closeBtnPos: Point;
    channelOpened: ColorTarget;
    guildChannelSelected: ColorTarget;
    inputPlaceholder: TextTarget;
}

export interface AssistConfig {
    manorPos: Point;
    neighborPanelPos: Point;
    visitBtnPos: Point;
    assistBtnPos: Point;
    likeBtnPos: Point;
    backToNeighborPos: Point;
    manorOpened: ColorTarget;
    neighborPanel: TextTarget;
    assistableColor: ColorTarget;
    oneClickColor: ColorTarget;
    oneClickAssist: TextTarget;
    oneClickAssistReward: TextTarget;
}

export interface GuildConfig {
    hunt: HuntConfig;
    donate: DonateConfig;
    chat: ChatConfig;
    assist: AssistConfig;
}

export const guildConfig: GuildConfig = {
    hunt: {
        guildTabPos: { x: 693, y: 2316 },
        huntEntryPos: { x: 152, y: 1335 },
        challengePos: { x: 550, y: 2296 },
        autoDeployPos: { x: 351, y: 2316 },
        startChallengePos: { x: 953, y: 2311 },
        guildHall: { desc: "工会大厅", text: "大厅", region: { x: 357, y: 397, w: 95, h: 48 } },
        challenge: { desc: "挑战按钮", text: "挑战", region: { x: 459, y: 2251, w: 160, h: 96 } },
        startChallenge: { desc: "开始挑战按钮", text: "开始挑战", region: { x: 838, y: 2277, w: 212, h: 68 } },
        confirmStartChallenge: { desc: "二次确认开始挑战按钮", text: "开始挑战", region: { x: 624, y: 2238, w: 227, h: 80 } },
        deployBtn: { desc: "上阵/下阵按钮区域", text: "上阵", region: { x: 218, y: 2268, w: 244, h: 91 } },
        undeployBtn: { desc: "一键下阵", text: "下阵", region: { x: 218, y: 2268, w: 244, h: 91 } },
        plantCount: { desc: "植物数量", text: "6", region: { x: 957, y: 1171, w: 37, h: 67 } },
        dailySettle: { desc: "每日结算", text: "每日结算中", region: { x: 310, y: 2271, w: 232, h: 77 } },
        challengeEnd: { desc: "挑战结束", text: "挑战结束", region: { x: 186, y: 759, w: 670, h: 221 } },
        autoReleaseSkill: { desc: "判断挑战", text: "自动释放", region: { x: 197, y: 2164, w: 131, h: 51 } },
        reviveBtnColor: {
            desc: "复活按钮",
            firstColor: "#c67339",
            paths: [[40, 1, "#d47e3c"], [24, 17, "#f0d0ad"], [-6, 9, "#b85e1a"], [48, 8, "#c07537"], [22, 33, "#fcefdc"]],
            region: [935, 934, 74, 53],
        },
        battleCheckInterval: 5000,
        maxBackAttempts: 10,
        backToChallengePos: { x: 721, y: 2140 },
    },
    donate: {
        guildTabPos: { x: 693, y: 2316 },
        donateEntryPos: { x: 1008, y: 2038 },
        goldDonateBtnPos: { x: 907, y: 1192 },
        confirmDonatePos: { x: 500, y: 1600 },
        closePopupPos: { x: 500, y: 1900 },
        donateBtnRedDot: {
            desc: "捐献按钮红点",
            firstColor: "#ff5130",
            paths: [[11, -5, "#f9efdb"], [8, 11, "#f4e9de"], [-152, 40, "#e78200"], [-163, 36, "#feef8d"]],
            region: [310, 2271, 232, 77],
        },
        guildHall: { desc: "工会大厅", text: "大厅", region: { x: 357, y: 397, w: 95, h: 48 } },
        donateBtn: { desc: "捐献按钮", text: "捐献", region: { x: 717, y: 2335, w: 103, h: 51 } },
        donateSuccess: { desc: "捐献成功提示", text: "捐献成功", region: { x: 400, y: 1000, w: 300, h: 80 } },
        goldDonate: { desc: "金币捐献", text: "金币捐献", region: { x: 200, y: 800, w: 200, h: 80 } },
        confirmBtn: { desc: "确认按钮", text: "确认", region: { x: 500, y: 1500, w: 200, h: 80 } },
        closeBtn: { desc: "关闭按钮", text: "关闭", region: { x: 500, y: 1800, w: 200, h: 80 } },
        donateLimit: { desc: "已达上限", text: "已达上限", region: { x: 825, y: 1179, w: 180, h: 61 } },
    },
    chat: {
        channelEntryPos: { x: 578, y: 2178 },
        guildChannelPos: { x: 620, y: 1986 },
        inputBoxPos: { x: 684, y: 1837 },
        emojiPos: { x: 154, y: 1288 },
        sendBtnPos: { x: 894, y: 1845 },
        closeBtnPos: { x: 975, y: 538 },
        channelOpened: {
            desc: "频道已打开",
            firstColor: "#ff9479",
            paths: [[-18, -14, "#f2af8d"], [18, -14, "#f2b08d"], [10, -23, "#8e733c"], [-12, -24, "#8e733d"], [-1, -35, "#ffe793"]],
        },
        guildChannelSelected: {
            desc: "工会频道已选中",
            firstColor: "#d3a57a",
            paths: [[-21, 8, "#9a5d39"], [25, 6, "#9a5d39"], [-18, 53, "#fcebbe"], [12, 47, "#fcebbe"], [-47, 48, "#915735"], [53, 47, "#9a5c37"]],
        },
        inputPlaceholder: { desc: "请输入内容", text: "内容", region: { x: 196, y: 1814, w: 87, h: 54 } },
    },
    assist: {
        manorPos: { x: 998, y: 2318 },
        neighborPanelPos: { x: 1001, y: 1575 },
        visitBtnPos: { x: 917, y: 1107 },
        assistBtnPos: { x: 105, y: 2071 },
        likeBtnPos: { x: 516, y: 256 },
        backToNeighborPos: { x: 998, y: 1916 },
        manorOpened: {
            desc: "庄园已打开",
            firstColor: "#fd942f",
            paths: [[1, -17, "#7ea31f"], [92, -21, "#e2f393"], [114, -24, "#e3f396"], [107, -5, "#e3f79a"], [104, -16, "#7da020"], [92, -7, "#7ea120"], [53, -18, "#759a88"], [-7, -40, "#759a88"]],
            region: [913, 2237, 156, 158],
        },
        neighborPanel: { desc: "好友", text: "好友", region: { x: 472, y: 551, w: 135, h: 74 } },
        assistableColor: {
            desc: "可协助好友",
            firstColor: "#90dd6d",
            paths: [[-97, 15, "#40992b"], [2, 41, "#9ee566"], [-47, 43, "#96ec66"], [-94, 30, "#4ba632"], [-42, -1, "#89e06d"]],
            region: [643, 1068, 196, 112],
        },
        oneClickColor: {
            desc: "一键协助按钮红点",
            firstColor: "#ff5032",
            paths: [[-7, -8, "#f9efdb"], [-9, 8, "#f4e9de"], [-18, -3, "#ff5032"], [-38, 15, "#e4933b"], [-80, 18, "#648cc3"]],
            region: [50, 1987, 120, 58],
        },
        oneClickAssist: { desc: "一键协助", text: "一键协助", region: { x: 22, y: 2088, w: 156, h: 49 } },
        oneClickAssistReward: { desc: "协助奖励", text: "恭喜获得", region: { x: 396, y: 969, w: 283, h: 83 } },
    },
};
