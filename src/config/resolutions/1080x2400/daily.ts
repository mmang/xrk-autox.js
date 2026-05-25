import { ColorTarget, Point, TextTarget } from "../../types";

export interface StaminaGiftConfig {
    friendPanelPos: Point;
    receiveStaminaPos: Point;
    oneClickReceivePos: Point;
    closePanelPos: Point;
    oneClickSendPos: Point;
    receiveStamina: TextTarget;
    oneClickReceive: TextTarget;
    oneClickReceiveColor: ColorTarget;
}

export interface TravelConfig {
    travelPos: Point;
    quickTravelPos: Point;
    travelTitle: TextTarget;
}

export interface StageConfig {
    startBattlePos: Point;
    battlePos: Point;
    pausePos: Point;
    exitPos: Point;
    confirmExitPos: Point;
    settleBtn: TextTarget;
    battleBtn: TextTarget;
    refreshBtn: TextTarget;
    exitBtn: TextTarget;
    confirmBtn: TextTarget;
    startBattleBtn: TextTarget;
    doubleRewardBtn: TextTarget;
    doubleRewardPos: Point;
    closeRewardPos: Point;
    settlePos: Point;
}

export interface BuyStaminaConfig {
    staminaPos: Point;
    buyStaminaPos: Point;
    supplementTitle: TextTarget;
    freeBuyStaminaIcon: ColorTarget;
}

export interface ShopConfig {
    mainMenu: Omit<TextTarget, "region">;
    shop: Omit<TextTarget, "region">;
    dailyDeals: Omit<TextTarget, "region">;
    expPotion: Omit<TextTarget, "region">;
    buySuccess: Omit<TextTarget, "region">;
}

export interface SummonConfig {
    enterSummonPos: Point;
    abandonBtnPos: Point;
    summonPos: Point;
    closeRewardPos: Point;
    naturalSummon: TextTarget;
    abandonBtn: TextTarget;
    autoSummon: TextTarget;
}

export interface PlantWishConfig {
    enterWishPos: Point;
    freeWishPos: Point;
    plantWish: TextTarget;
    wishResultColor: ColorTarget;
}

export interface DailyConfig {
    staminaGift: StaminaGiftConfig;
    travel: TravelConfig;
    stage: StageConfig;
    buyStamina: BuyStaminaConfig;
    shop: ShopConfig;
    summon: SummonConfig;
    plantWish: PlantWishConfig;
}

export const dailyConfig: DailyConfig = {
    staminaGift: {
        friendPanelPos: { x: 813, y: 285 },
        receiveStaminaPos: { x: 846, y: 1703 },
        oneClickReceivePos: { x: 540, y: 1613 },
        closePanelPos: { x: 902, y: 646 },
        oneClickSendPos: { x: 507, y: 1696 },
        receiveStamina: { desc: "领取体力", text: "领取体力", region: { x: 723, y: 1658, w: 242, h: 97 } },
        oneClickReceive: { desc: "一键领取按钮", text: "领取", region: { x: 538, y: 1575, w: 102, h: 66 } },
        oneClickReceiveColor: {
            desc: "一键领取按钮灰色",
            firstColor: "#bcbcbc",
            paths: [[8, 21, "#bcbcbc"], [1, 38, "#9c9c9c"], [-31, 24, "#5a5a5a"], [-9, 42, "#bdbdbd"]],
            region: [604, 1576, 75, 76],
        },
    },
    travel: {
        travelPos: { x: 120, y: 1916 },
        quickTravelPos: { x: 412, y: 1713 },
        travelTitle: { desc: "游历标题", text: "游历", region: { x: 477, y: 965, w: 123, h: 68 } },
    },
    stage: {
        startBattlePos: { x: 553, y: 1889 },
        battlePos: { x: 705, y: 1936 },
        pausePos: { x: 73, y: 168 },
        exitPos: { x: 218, y: 2131 },
        confirmExitPos: { x: 744, y: 1442 },
        settleBtn: { desc: "结算页面按钮", text: "确定", region: { x: 662, y: 2114, w: 106, h: 61 } },
        battleBtn: { desc: "出战按钮", text: "出战", region: { x: 643, y: 1913, w: 133, h: 63 } },
        refreshBtn: { desc: "刷新按钮", text: "刷新", region: { x: 780, y: 2277, w: 135, h: 73 } },
        exitBtn: { desc: "退出按钮", text: "退出", region: { x: 160, y: 2107, w: 118, h: 63 } },
        confirmBtn: { desc: "确定按钮", text: "确定", region: { x: 685, y: 1412, w: 112, h: 68 } },
        startBattleBtn: { desc: "开始战斗", text: "开始战斗", region: { x: 417, y: 1842, w: 243, h: 69 } },
        doubleRewardBtn: { desc: "双倍奖励", text: "双倍", region: { x: 869, y: 2113, w: 182, h: 62 } },
        doubleRewardPos: { x: 900, y: 2124 },
        closeRewardPos: { x: 480, y: 2318 },
        settlePos: { x: 727, y: 2144 },
    },
    buyStamina: {
        staminaPos: { x: 636, y: 159 },
        buyStaminaPos: { x: 377, y: 1326 },
        supplementTitle: { desc: "补充体力", text: "补充体力", region: { x: 416, y: 837, w: 243, h: 80 } },
        freeBuyStaminaIcon: {
            desc: "免费购买体力图标",
            firstColor: "#f9efdb",
            paths: [[13, -11, "#293e48"], [-47, 6, "#4cc3f3"], [-30, 5, "#ffce52"], [-17, 9, "#293e48"]],
            region: [251, 1303, 81, 37],
        },
    },
    shop: {
        mainMenu: { desc: "主菜单", text: "主菜单" },
        shop: { desc: "商店入口", text: "商店" },
        dailyDeals: { desc: "每日特惠", text: "每日特惠" },
        expPotion: { desc: "经验药水", text: "经验药水" },
        buySuccess: { desc: "购买成功提示", text: "购买成功" },
    },
    summon: {
        enterSummonPos: { desc: "召唤入口按钮", x: 984, y: 1913 },
        abandonBtnPos: { desc: "放弃按钮", x: 323, y: 2101 },
        summonPos: { desc: "召唤按钮", x: 662, y: 2085 },
        closeRewardPos: { desc: "关闭奖励弹窗", x: 569, y: 1620 },
        naturalSummon: { desc: "自然召唤tab", text: "自然召唤", region: { x: 190, y: 2323, w: 885, h: 69 } },
        abandonBtn: { desc: "放弃按钮", text: "放弃", region: { x: 260, y: 2063, w: 131, h: 73 } },
        autoSummon: { desc: "自动召唤", text: "自动召唤", region: { x: 257, y: 2061, w: 227, h: 72 } },
    },
    plantWish: {
        enterWishPos: { desc: "祈愿入口按钮", x: 984, y: 1913 },
        freeWishPos: { desc: "免费祈愿按钮", x: 171, y: 1936 },
        plantWish: { desc: "植物祈愿tab", text: "植物祈愿", region: { x: 192, y: 2334, w: 881, h: 51 } },
        wishResultColor: {
            desc: "祈愿结果",
            firstColor: "#f1b92c",
            paths: [[0, 13, "#feef61"], [-1, 41, "#50a8a4"], [-38, 28, "#4da7ab"], [33, 54, "#54ada1"], [9, 65, "#fcd03c"]],
        },
    },
};
