import { SystemConfig } from "../../types";

export const systemConfig: SystemConfig = {
    game: {
        packageName: "com.bwxrk.yqmy.ty4",
        enterGamePos: { x: 557, y: 2153 },
        mainTabPos: { x: 532, y: 2298 },
        lobbyColor: {
            desc: "大厅",
            firstColor: "#f9efdb", paths: [[-21, -6, "#5a4127"], [65, -4, "#5a4127"], [86, 22, "#f3c060"], [-46, 22, "#f3c060"]], region: [463, 2347, 152, 48],
        },
        launchDelay: 3000,
        dualAppDelay: 8000,
        maxNavigateAttempts: 5,
        dualApp: {
            desc: "双开应用选择",
            text: "保卫向日葵",
            region: { x: 241, y: 2034, w: 207, h: 68 },
        },
        lobby: {
            desc: "大厅底部商城按钮",
            text: "商",
            region: { x: 20, y: 2308, w: 142, h: 91 },
        },
        enterGame: {
            desc: "登录页进入游戏按钮",
            text: "进入游戏",
            region: { x: 328, y: 2086, w: 409, h: 134 },
        },
        announce: {
            desc: "公告弹窗标题",
            text: "公告",
            region: { x: 481, y: 618, w: 116, h: 60 },
        },
        backBtnColor: {
            desc: "返回按钮",
            firstColor: "#d8dba0",
            paths: [[-13, -4, "#f6da96"], [-58, -34, "#fbeab7"], [-84, -13, "#fbeab7"], [-70, 5, "#fbeab7"], [-56, 18, "#fbeab7"], [-33, -11, "#fbeab7"]],
            region: [34, 2285, 104, 72],
        },
        dualApp2Pos: { x: 737, y: 1960 },
    },
    playTab: {
        playTabPos: { x: 849, y: 2305 },
        playTabOpened: {
            desc: "玩法tab",
            firstColor: "#ea612f",
            paths: [[-36, 16, "#c8822c"], [29, 19, "#c9822c"], [-5, 25, "#937bd7"], [-1, 50, "#3c2e69"], [-13, 9, "#685351"]],
            region: [776, 2247, 116, 136],
        },
    },
    scroll: {
        dailyDungeonText: {
            desc: "日常副本",
            text: "日常副本",
            region: { x: 756, y: 237, w: 270, h: 82 },
        },
        maxScrollRetries: 5,
        swipeStartPos: { x: 556, y: 933 },
        swipeEndPos: { x: 563, y: 1115 },
    },
};
