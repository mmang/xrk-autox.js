import { PermissionHelper } from "./utils/permission";
import { ScreenHelper } from "./utils/screen";
import { OcrHelper, TextTarget } from "./utils/ocr";
import { Logger } from "./utils/logger";
import { MultiColorTarget } from "./utils/screen";

const TAG = "TestUtils";

const TEST_CFG = {
    testText: TextTarget({ desc: "测试-商城", text: "商城", region: { x: 20, y: 2308, w: 142, h: 91 } }),
    testTextNoRegion: TextTarget({ desc: "测试-商城(全屏)", text: "商城" }),
    lobbyColor: MultiColorTarget({ desc: "大厅", firstColor: "#573b23", paths: [[-37, -22, "#4f8f5f"], [-64, 18, "#4b9966"], [63, 9, "#3c8054"], [55, 52, "#b5db51"], [-56, 51, "#b5db51"], [-2, 36, "#804e2f"]], region: [426, 2215, 227, 174] as [number, number, number, number] }),
};

function recycleImage(img: Image): void {
    if (img && typeof (img as any).recycle === "function") {
        (img as any).recycle();
    }
}

function testCapture(): boolean {
    Logger.info(TAG, "===== 1. 截图测试 =====");
    const img = ScreenHelper.tryCapture();
    if (img) {
        Logger.info(TAG, `截图成功, 尺寸: ${img.width}x${img.height}`);
        recycleImage(img);
        return true;
    }
    Logger.error(TAG, "截图失败! 请检查截图权限");
    return false;
}

function testOcrRecognize(): void {
    Logger.info(TAG, "===== 2. OCR 全屏识别测试 =====");
    const img = ScreenHelper.tryCapture();
    if (!img) { Logger.error(TAG, "截图失败，跳过"); return; }
    try {
        const results = OcrHelper.recognize(img);
        Logger.info(TAG, `识别到 ${results.length} 条文字:`);
        for (let i = 0; i < Math.min(results.length, 15); i++) {
            const r = results[i];
            Logger.info(TAG, `  [${i}] "${r.text}" conf=${r.confidence.toFixed(3)} bounds=(${r.bounds.left},${r.bounds.top},${r.bounds.right},${r.bounds.bottom})`);
        }
        if (results.length > 15) {
            Logger.info(TAG, `  ... 共 ${results.length} 条，仅显示前15条`);
        }
    } finally {
        recycleImage(img);
    }
}

function testOcrRegion(): void {
    Logger.info(TAG, "===== 3. OCR 区域识别测试 =====");
    const region = TEST_CFG.testText.region!;
    Logger.info(TAG, `区域: x=${region.x}, y=${region.y}, w=${region.w}, h=${region.h}`);
    const img = ScreenHelper.tryCapture();
    if (!img) { Logger.error(TAG, "截图失败，跳过"); return; }
    try {
        const results = OcrHelper.recognizeInRegion(region, img);
        Logger.info(TAG, `区域内识别到 ${results.length} 条文字:`);
        for (let i = 0; i < results.length; i++) {
            const r = results[i];
            Logger.info(TAG, `  [${i}] "${r.text}" conf=${r.confidence.toFixed(3)}`);
        }
    } finally {
        recycleImage(img);
    }
}

function testFindText(): void {
    Logger.info(TAG, "===== 4. 查找文字测试 =====");
    const img = ScreenHelper.tryCapture();
    if (!img) { Logger.error(TAG, "截图失败，跳过"); return; }
    try {
        const t1 = TEST_CFG.testText;
        Logger.info(TAG, `findText(带区域): desc="${t1.desc}", text="${t1.text}"`);
        const m1 = OcrHelper.findText(t1, img);
        if (m1) {
            Logger.info(TAG, `  ✓ 找到! text="${m1.text}" conf=${m1.confidence.toFixed(3)} center=(${m1.bounds.centerX()},${m1.bounds.centerY()})`);
        } else {
            Logger.warn(TAG, `  ✗ 未找到 "${t1.text}"`);
        }

        const t2 = TEST_CFG.testTextNoRegion;
        Logger.info(TAG, `findText(全屏): desc="${t2.desc}", text="${t2.text}"`);
        const m2 = OcrHelper.findText(t2, img);
        if (m2) {
            Logger.info(TAG, `  ✓ 找到! text="${m2.text}" conf=${m2.confidence.toFixed(3)} center=(${m2.bounds.centerX()},${m2.bounds.centerY()})`);
        } else {
            Logger.warn(TAG, `  ✗ 未找到 "${t2.text}"`);
        }

        Logger.info(TAG, `hasText(带区域): ${OcrHelper.hasText(t1, img)}`);
        Logger.info(TAG, `hasText(全屏): ${OcrHelper.hasText(t2, img)}`);
    } finally {
        recycleImage(img);
    }
}

function testMultiColor(): void {
    Logger.info(TAG, "===== 5. 多点找色测试 =====");
    const config = TEST_CFG.lobbyColor;
    Logger.info(TAG, `firstColor=${config.firstColor}, paths数量=${config.paths.length}, region=${JSON.stringify(config.region)}`);
    const img = ScreenHelper.tryCapture();
    if (!img) { Logger.error(TAG, "截图失败，跳过"); return; }
    try {
        const result = ScreenHelper.findMultiColorsInImg(img, config);
        if (result) {
            Logger.info(TAG, `  ✓ 找到! 坐标=(${result.x}, ${result.y})`);
        } else {
            Logger.warn(TAG, "  ✗ 未找到目标颜色组合");
        }
    } finally {
        recycleImage(img);
    }
}

function main(): void {
    Logger.info(TAG, "========== 工具类测试开始 ==========");

    if (!PermissionHelper.waitForAccessibility()) {
        toastLog("请先开启无障碍服务");
        return;
    }

    if (!PermissionHelper.requestScreenCapture()) {
        toastLog("截图权限获取失败");
        return;
    }

    sleep(500);

    const captureOk = testCapture();
    if (!captureOk) {
        Logger.error(TAG, "截图失败，后续测试终止");
        return;
    }
    sleep(500);

    testOcrRecognize();
    sleep(500);

    testOcrRegion();
    sleep(500);

    testFindText();
    sleep(500);

    testMultiColor();

    Logger.info(TAG, "========== 测试完成 ==========");
    toast("测试完成，请查看日志");
    exit();
}

main();
