declare function click(x: number, y: number): void;
declare function click(label: string): void;
declare function setScreenMetrics(width: number, height: number): void;
declare function sleep(ms: number): void;
declare function back(): void;
declare function home(): void;
declare function toast(message: string): void;
declare function toastLog(message: string): void;
declare function log(message: any, ...args: any[]): void;
declare function launch(packageName: string): void;
declare function currentPackage(): string;
declare function longClick(x: number, y: number): void;
declare function press(x: number, y: number, duration: number): void;
declare function swipe(x1: number, y1: number, x2: number, y2: number, duration: number): void;
declare function requestScreenCapture(landscape?: boolean): boolean;
declare function captureScreen(): Image;
declare function exit(err?: any): void;
declare function shell(cmd: string, root?: boolean): string;

declare namespace JSX {
    interface IntrinsicElements {
        vertical: any;
        horizontal: any;
        linear: any;
        scroll: any;
        frame: any;
        card: any;
        text: any;
        button: any;
        checkbox: any;
        radio: any;
        radiogroup: any;
        input: any;
        progressbar: any;
        spinner: any;
    }
}

interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width(): number;
    height(): number;
    centerX(): number;
    centerY(): number;
}

interface UiSelector {
    findOne(timeout?: number): UiObject | null;
    findOnce(index?: number): UiObject | null;
    exists(): boolean;
    click(): boolean;
    waitFor(): void;
    text(str: string): UiSelector;
    textContains(str: string): UiSelector;
    textMatches(regex: string | RegExp): UiSelector;
    desc(str: string): UiSelector;
    descContains(str: string): UiSelector;
    id(id: string): UiSelector;
    className(str: string): UiSelector;
    clickable(b?: boolean): UiSelector;
    enabled(b?: boolean): UiSelector;
    scrollable(b?: boolean): UiSelector;
    bounds(l: number, t: number, r: number, b: number): UiSelector;
}

interface UiObject {
    click(): boolean;
    longClick(): boolean;
    setText(text: string): boolean;
    text(): string;
    bounds(): Rect;
    parent(): UiObject | null;
    child(i: number): UiObject | null;
    children(): UiObject[];
    childCount(): number;
    scrollForward(): boolean;
    scrollBackward(): boolean;
}

interface Image {
    width: number;
    height: number;
}

declare function text(str: string): UiSelector;
declare function textMatches(regex: string | RegExp): UiSelector;
declare function desc(str: string): UiSelector;
declare function id(str: string): UiSelector;
declare function selector(): UiSelector;

declare namespace text {
    function findOne(timeout?: number): UiObject | null;
    function exists(): boolean;
}

interface OcrResult {
    text: string;
    words: string;
    confidence: number;
    bounds: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
}

declare namespace paddle {
    function ocr(img: Image, path?: string): OcrResult[];
    function ocr(img: Image, cpuThreadNum: number, useSlim: boolean): OcrResult[];
    function ocrText(img: Image): string[];
    function ocrText(img: Image, cpuThreadNum: number, useSlim: boolean): string[];
    function release(): void;
}

interface GmlkitOcrBlock {
    text: string;
    bounds: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
}

interface GmlkitOcrResult {
    text: string;
    blocks: GmlkitOcrBlock[];
}

declare namespace gmlkit {
    function ocr(img: Image, language: string): GmlkitOcrResult;
}

declare namespace images {
    function clip(img: Image, x: number, y: number, w: number, h: number): Image;
    function findImage(img: Image, template: Image, options?: { threshold?: number; region?: [number, number, number, number] }): { x: number; y: number } | null;
    function findColor(img: Image, color: string | number, options?: { region?: [number, number, number, number]; threshold?: number }): { x: number; y: number } | null;
    function findMultiColors(img: Image, firstColor: string | number, paths: (string | number)[][], options?: { region?: [number, number, number, number]; threshold?: number }): { x: number; y: number } | null;
    function pixel(img: Image, x: number, y: number): number;
    function detectsColor(img: Image, color: string | number, x: number, y: number, threshold?: number): boolean;
    function save(img: Image, path: string, format?: string, quality?: number): void;
    function load(path: string): Image;
    function fromBase64(base64: string): Image;
    function toBase64(img: Image, format?: string, quality?: string): string;
}

declare namespace floaty {
    function rawWindow(xml: any): any;
    function checkPermission(): boolean;
    function requestPermission(): void;
}

declare namespace threads {
    function start(func: Function): any;
}

declare namespace console {
    function log(message: any, ...args: any[]): void;
    function info(message: any, ...args: any[]): void;
    function warn(message: any, ...args: any[]): void;
    function error(message: any, ...args: any[]): void;
    function verbose(message: any, ...args: any[]): void;
    function show(): void;
    function hide(): void;
    function clear(): void;
}

declare namespace device {
    var width: number;
    var height: number;
    var brand: string;
    var model: string;
    var sdkInt: number;
    function wakeUp(): void;
    function keepScreenOn(timeout?: number): void;
    function keepScreenDim(timeout?: number): void;
    function cancelKeepingScreen(): void;
    function vibrate(ms: number): void;
    function cancelVibration(): void;
}

declare namespace runtime {
    function requestPermissions(permissions: string[]): void;
}

declare namespace ui {
    function h(type: string, props: any, ...children: any[]): any;
    function run(func: Function): void;
    function layout(xml: any): void;
    function finish(): void;
    var statusText: any;
    var progressBar: any;
    var logText: any;
    var btnRun: any;
    var btnPause: any;
    var btnStop: any;
    var btnClearLog: any;
    var chkDaily: any;
    var chkShop: any;
    var chkChain: any;
    var inputDailyRuns: any;
}

declare var auto: {
    waitFor: () => void;
    setMode: (mode: string) => void;
};

declare namespace files {
    function read(path: string, encoding?: string): string;
    function write(path: string, text: string, encoding?: string): void;
    function append(path: string, text: string, encoding?: string): void;
    function exists(path: string): boolean;
    function remove(path: string): boolean;
    function createWithDirs(path: string): boolean;
    function ensureDir(path: string): void;
    function join(parent: string, ...child: string[]): string;
    function isFile(path: string): boolean;
    function isDir(path: string): boolean;
    function getSdcardPath(): string;
}

declare var setInterval: (callback: Function, ms: number) => any;
declare var clearInterval: (id: any) => void;
declare var context: any;
