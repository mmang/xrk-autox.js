import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

    static scaleTextRegion(region: { x: number; y: number; w: number; h: number }): { x: number; y: number; w: number; h: number } {
        return {
            x: Math.round(region.x * ScaleHelper._scaleX),
            y: Math.round(region.y * ScaleHelper._scaleY + ScaleHelper.getStatusBarOffset()),
            w: Math.round(region.w * ScaleHelper._scaleX),
            h: Math.round(region.h * ScaleHelper._scaleY),
        };
    }
}

interface TestImage {
    file: string;
    actualW: number;
    actualH: number;
    statusBarHeight: number;
    statusBarVisible: boolean;
}

const DESIGN_REGION = { x: 20, y: 2308, w: 142, h: 91 };

const TEST_IMAGES: TestImage[] = [
    { file: "1080*2400.jpg", actualW: 1080, actualH: 2400, statusBarHeight: 88, statusBarVisible: true },
    { file: "1080*2400.jpg", actualW: 1080, actualH: 2400, statusBarHeight: 88, statusBarVisible: false },
    { file: "1320*2760.jpg", actualW: 1320, actualH: 2760, statusBarHeight: 90, statusBarVisible: true },
    { file: "1320*2760.jpg", actualW: 1320, actualH: 2760, statusBarHeight: 90, statusBarVisible: false },
    { file: "1600*2560.jpg", actualW: 1600, actualH: 2560, statusBarHeight: 0, statusBarVisible: false },
];

const TESTS_DIR = path.resolve(__dirname);
const OUTPUT_DIR = path.resolve(__dirname, "clip_output");

async function main(): Promise<void> {
    console.log("========== 截图裁剪测试 ==========");
    console.log(`设计坐标: ${JSON.stringify(DESIGN_REGION)}\n`);

    for (const img of TEST_IMAGES) {
        ScaleHelper.initForTest(img.actualW, img.actualH, img.statusBarHeight);
        ScaleHelper.setStatusBarVisible(img.statusBarVisible);

        const scaled = ScaleHelper.scaleTextRegion(DESIGN_REGION);
        const statusLabel = img.statusBarVisible ? "状态栏显示" : "状态栏隐藏";
        const outputName = `${path.parse(img.file).name}_${statusLabel}_clip.png`;

        console.log(`--- ${img.file} (${img.actualW}x${img.actualH}, ${statusLabel}) ---`);
        console.log(`  缩放后: ${JSON.stringify(scaled)}`);
        console.log(`  scaleX=${ScaleHelper.scaleX.toFixed(4)}, scaleY=${ScaleHelper.scaleY.toFixed(4)}, offset=${ScaleHelper.getStatusBarOffset()}`);

        const inputPath = path.join(TESTS_DIR, img.file);
        const outputPath = path.join(OUTPUT_DIR, outputName);

        try {
            await sharp(inputPath)
                .extract({
                    left: Math.max(0, scaled.x),
                    top: Math.max(0, scaled.y),
                    width: scaled.w,
                    height: scaled.h,
                })
                .toFile(outputPath);
            console.log(`  ✅ 已保存: ${outputPath}`);
        } catch (e) {
            console.log(`  ❌ 裁剪失败: ${e}`);
        }
    }

    console.log("\n========== 完成 ==========");
}

main().catch(console.error);
