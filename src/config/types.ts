export interface Point {
    desc?: string;
    x: number;
    y: number;
}

export interface Region {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ColorTarget {
    desc: string;
    firstColor: string;
    paths: [number, number, string][];
    region?: [number, number, number, number];
}

export interface TextTarget {
    desc: string;
    text: string;
    region: Region;
}

export interface GameConfig {
    packageName: string;
    enterGamePos: Point;
    mainTabPos: Point;
    lobbyColor: ColorTarget;
    launchDelay: number;
    dualAppDelay: number;
    maxNavigateAttempts: number;
    dualApp: TextTarget;
    lobby: TextTarget;
    enterGame: TextTarget;
    announce: TextTarget;
    backBtnColor: ColorTarget;
    dualApp2Pos: Point;
}

export interface PlayTabConfig {
    playTabPos: Point;
    playTabOpened: ColorTarget;
}

export interface ScrollConfig {
    dailyDungeonText: TextTarget;
    maxScrollRetries: number;
    swipeStartPos: Point;
    swipeEndPos: Point;
}

export interface SystemConfig {
    game: GameConfig;
    playTab: PlayTabConfig;
    scroll: ScrollConfig;
}
