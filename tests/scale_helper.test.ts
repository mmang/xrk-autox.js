const DESIGN_WIDTH = 1080;
const DESIGN_HEIGHT = 2400;

class ScaleHelper {
    private static _scaleX = 1;
    private static _scaleY = 1;
    private static _statusBarHeight = 0;
    private static _statusBarVisible = true;

    static initForTest(actualW: number, actualH: number, statusBarHeight: number): void {
        ScaleHelper._scaleX = actualW / DESIGN_WIDTH;
        ScaleHelper._scaleY = actualH / DESIGN_HEIGHT;
        ScaleHelper._statusBarHeight = statusBarHeight;
        ScaleHelper._statusBarVisible = true;
    }

    static setStatusBarVisible(visible: boolean): void {
        ScaleHelper._statusBarVisible = visible;
    }

    static get scaleX(): number { return ScaleHelper._scaleX; }
    static get scaleY(): number { return ScaleHelper._scaleY; }

    static getStatusBarOffset(): number {
        return ScaleHelper._statusBarVisible ? 0 : -ScaleHelper._statusBarHeight;
    }

    static scalePoint(x: number, y: number): { x: number; y: number } {
        return {
            x: Math.round(x * ScaleHelper._scaleX),
            y: Math.round(y * ScaleHelper._scaleY + ScaleHelper.getStatusBarOffset()),
        };
    }

    static scaleRegion(region: [number, number, number, number]): [number, number, number, number] {
        return [
            Math.round(region[0] * ScaleHelper._scaleX),
            Math.round(region[1] * ScaleHelper._scaleY + ScaleHelper.getStatusBarOffset()),
            Math.round(region[2] * ScaleHelper._scaleX),
            Math.round(region[3] * ScaleHelper._scaleY),
        ];
    }

    static scaleTextRegion(region: { x: number; y: number; w: number; h: number }): { x: number; y: number; w: number; h: number } {
        return {
            x: Math.round(region.x * ScaleHelper._scaleX),
            y: Math.round(region.y * ScaleHelper._scaleY + ScaleHelper.getStatusBarOffset()),
            w: Math.round(region.w * ScaleHelper._scaleX),
            h: Math.round(region.h * ScaleHelper._scaleY),
        };
    }

    static unscalePoint(x: number, y: number): { x: number; y: number } {
        return {
            x: Math.round(x / ScaleHelper._scaleX),
            y: Math.round((y - ScaleHelper.getStatusBarOffset()) / ScaleHelper._scaleY),
        };
    }

    static unscaleRect(left: number, top: number, right: number, bottom: number): { left: number; top: number; right: number; bottom: number } {
        return {
            left: Math.round(left / ScaleHelper._scaleX),
            top: Math.round((top - ScaleHelper.getStatusBarOffset()) / ScaleHelper._scaleY),
            right: Math.round(right / ScaleHelper._scaleX),
            bottom: Math.round((bottom - ScaleHelper.getStatusBarOffset()) / ScaleHelper._scaleY),
        };
    }
}

interface TestCase {
    name: string;
    actualW: number;
    actualH: number;
    statusBarHeight: number;
    statusBarVisible: boolean;
}

const CASES: TestCase[] = [
    { name: "基准设备(状态栏显示)", actualW: 1080, actualH: 2400, statusBarHeight: 88, statusBarVisible: true },
    { name: "基准设备(状态栏隐藏)", actualW: 1080, actualH: 2400, statusBarHeight: 88, statusBarVisible: false },
    { name: "720x1600(状态栏显示)", actualW: 720, actualH: 1600, statusBarHeight: 72, statusBarVisible: true },
    { name: "720x1600(状态栏隐藏)", actualW: 720, actualH: 1600, statusBarHeight: 72, statusBarVisible: false },
    { name: "1440x3200(状态栏显示)", actualW: 1440, actualH: 3200, statusBarHeight: 90, statusBarVisible: true },
    { name: "1440x3200(状态栏隐藏)", actualW: 1440, actualH: 3200, statusBarHeight: 90, statusBarVisible: false },
];

const DESIGN_POINTS: [number, number][] = [
    [0, 0],
    [540, 1200],
    [1080, 2400],
    [102, 2064],
    [557, 2153],
    [849, 2305],
    [73, 168],
    [1008, 2038],
    [912, 1955],
    [907, 1961],
];

const DESIGN_REGIONS: [number, number, number, number][] = [
    [426, 2215, 227, 174],
    [203, 1961, 290, 175],
    [643, 1913, 133, 63],
    [34, 2285, 104, 72],
    [935, 934, 74, 53],
    [604, 1576, 75, 76],
    [251, 1303, 81, 37],
];

const DESIGN_TEXT_REGIONS: { x: number; y: number; w: number; h: number }[] = [
    { x: 203, y: 1961, w: 290, h: 175 },
    { x: 643, y: 1913, w: 133, h: 63 },
    { x: 20, y: 2308, w: 142, h: 91 },
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string): void {
    totalTests++;
    if (condition) {
        passedTests++;
    } else {
        failedTests++;
        console.log(`  ✗ ${message}`);
    }
}

function testRoundTripPoints(): void {
    console.log("\n===== 测试1: 坐标往返验证 =====");

    for (const tc of CASES) {
        ScaleHelper.initForTest(tc.actualW, tc.actualH, tc.statusBarHeight);
        ScaleHelper.setStatusBarVisible(tc.statusBarVisible);

        console.log(`\n--- ${tc.name} (scaleX=${ScaleHelper.scaleX.toFixed(4)}, scaleY=${ScaleHelper.scaleY.toFixed(4)}, offset=${ScaleHelper.getStatusBarOffset()}) ---`);

        for (const [dx, dy] of DESIGN_POINTS) {
            const scaled = ScaleHelper.scalePoint(dx, dy);
            const unscaled = ScaleHelper.unscalePoint(scaled.x, scaled.y);

            assert(
                unscaled.x === dx || Math.abs(unscaled.x - dx) <= 1,
                `Point(${dx},${dy}) → (${scaled.x},${scaled.y}) → (${unscaled.x},${unscaled.y}) X往返不一致`
            );
            assert(
                unscaled.y === dy || Math.abs(unscaled.y - dy) <= 1,
                `Point(${dx},${dy}) → (${scaled.x},${scaled.y}) → (${unscaled.x},${unscaled.y}) Y往返不一致`
            );
        }
    }
}

function testRoundTripRegions(): void {
    console.log("\n===== 测试2: 区域往返验证 =====");

    for (const tc of CASES) {
        ScaleHelper.initForTest(tc.actualW, tc.actualH, tc.statusBarHeight);
        ScaleHelper.setStatusBarVisible(tc.statusBarVisible);

        for (const region of DESIGN_REGIONS) {
            const scaled = ScaleHelper.scaleRegion(region);
            const unscaled = ScaleHelper.unscaleRect(scaled[0], scaled[1], scaled[0] + scaled[2], scaled[1] + scaled[3]);
            const wDiff = Math.abs((unscaled.right - unscaled.left) - region[2]);
            const hDiff = Math.abs((unscaled.bottom - unscaled.top) - region[3]);

            assert(
                wDiff <= 1 && hDiff <= 1,
                `Region${JSON.stringify(region)} → ${JSON.stringify(scaled)} → w=${unscaled.right - unscaled.left},h=${unscaled.bottom - unscaled.top} 往返不一致`
            );
        }

        for (const region of DESIGN_TEXT_REGIONS) {
            const scaled = ScaleHelper.scaleTextRegion(region);
            const unscaled = ScaleHelper.unscaleRect(scaled.x, scaled.y, scaled.x + scaled.w, scaled.y + scaled.h);
            const wDiff = Math.abs((unscaled.right - unscaled.left) - region.w);
            const hDiff = Math.abs((unscaled.bottom - unscaled.top) - region.h);

            assert(
                wDiff <= 1 && hDiff <= 1,
                `TextRegion${JSON.stringify(region)} → ${JSON.stringify(scaled)} → w=${unscaled.right - unscaled.left},h=${unscaled.bottom - unscaled.top} 往返不一致`
            );
        }
    }
}

function testBoundaryCheck(): void {
    console.log("\n===== 测试3: 缩放后 region 不超出图片边界 =====");

    const imageSizes: { name: string; w: number; h: number }[] = [
        { name: "1080x2400", w: 1080, h: 2400 },
        { name: "720x1600", w: 720, h: 1600 },
        { name: "1440x3200", w: 1440, h: 3200 },
    ];

    for (const imgSize of imageSizes) {
        for (const visible of [true, false]) {
            const statusBarH = imgSize.w === 720 ? 72 : (imgSize.w === 1440 ? 90 : 88);
            ScaleHelper.initForTest(imgSize.w, imgSize.h, statusBarH);
            ScaleHelper.setStatusBarVisible(visible);

            const label = `${imgSize.name}(状态栏${visible ? "显示" : "隐藏"})`;
            let allInBounds = true;

            for (const region of DESIGN_REGIONS) {
                const scaled = ScaleHelper.scaleRegion(region);
                const right = scaled[0] + scaled[2];
                const bottom = scaled[1] + scaled[3];

                if (scaled[0] < 0 || scaled[1] < 0 || right > imgSize.w || bottom > imgSize.h) {
                    allInBounds = false;
                    assert(false, `${label}: Region${JSON.stringify(region)} 缩放后 [${scaled}] 超出边界(${imgSize.w}x${imgSize.h})`);
                }
            }

            for (const region of DESIGN_TEXT_REGIONS) {
                const scaled = ScaleHelper.scaleTextRegion(region);
                const right = scaled.x + scaled.w;
                const bottom = scaled.y + scaled.h;

                if (scaled.x < 0 || scaled.y < 0 || right > imgSize.w || bottom > imgSize.h) {
                    allInBounds = false;
                    assert(false, `${label}: TextRegion${JSON.stringify(region)} 缩放后 ${JSON.stringify(scaled)} 超出边界(${imgSize.w}x${imgSize.h})`);
                }
            }

            if (allInBounds) {
                assert(true, `${label}: 所有 region 在边界内`);
            }
        }
    }
}

function testStatusBarOffset(): void {
    console.log("\n===== 测试4: 状态栏偏移正确性 =====");

    ScaleHelper.initForTest(1080, 2400, 88);

    ScaleHelper.setStatusBarVisible(true);
    const offsetShow = ScaleHelper.getStatusBarOffset();
    assert(offsetShow === 0, `状态栏显示时 offset 应为 0, 实际=${offsetShow}`);

    const p1 = ScaleHelper.scalePoint(540, 1200);
    assert(p1.y === 1200, `状态栏显示: scalePoint(540,1200).y 应为 1200, 实际=${p1.y}`);

    ScaleHelper.setStatusBarVisible(false);
    const offsetHide = ScaleHelper.getStatusBarOffset();
    assert(offsetHide === -88, `状态栏隐藏时 offset 应为 -88, 实际=${offsetHide}`);

    const p2 = ScaleHelper.scalePoint(540, 1200);
    assert(p2.y === 1200 - 88, `状态栏隐藏: scalePoint(540,1200).y 应为 ${1200 - 88}, 实际=${p2.y}`);

    const unscaled = ScaleHelper.unscalePoint(p2.x, p2.y);
    assert(
        unscaled.x === 540 && (unscaled.y === 1200 || Math.abs(unscaled.y - 1200) <= 1),
        `状态栏隐藏: unscalePoint(${p2.x},${p2.y}) 应为 (540,1200), 实际=(${unscaled.x},${unscaled.y})`
    );
}

function testScalePointConsistency(): void {
    console.log("\n===== 测试5: scalePoint 与 click 坐标一致性 =====");
    console.log("  验证: 同一个设计坐标，scalePoint 结果应与 setScreenMetrics 的 click 行为一致");

    ScaleHelper.initForTest(720, 1600, 72);
    ScaleHelper.setStatusBarVisible(true);

    const scaleX = 720 / 1080;
    const scaleY = 1600 / 2400;

    for (const [dx, dy] of DESIGN_POINTS) {
        const scaled = ScaleHelper.scalePoint(dx, dy);
        const expectedX = Math.round(dx * scaleX);
        const expectedY = Math.round(dy * scaleY);

        assert(
            scaled.x === expectedX && scaled.y === expectedY,
            `Point(${dx},${dy}) scalePoint=(${scaled.x},${scaled.y}) 预期=(${expectedX},${expectedY}) 不一致`
        );
    }
}

function main(): void {
    console.log("========== ScaleHelper 电脑端测试 ==========");

    testRoundTripPoints();
    testRoundTripRegions();
    testBoundaryCheck();
    testStatusBarOffset();
    testScalePointConsistency();

    console.log("\n========== 测试结果 ==========");
    console.log(`总计: ${totalTests} 项`);
    console.log(`通过: ${passedTests} 项`);
    console.log(`失败: ${failedTests} 项`);

    if (failedTests > 0) {
        console.log("\n❌ 存在失败的测试项");
        process.exit(1);
    } else {
        console.log("\n✅ 所有测试通过");
    }
}

main();
