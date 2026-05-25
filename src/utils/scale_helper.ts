import { Logger } from "./logger";
import { recycleImage } from "./image";

const TAG = "ScaleHelper";

export class ScaleHelper {
    private static _screenWidth = 0;
    private static _screenHeight = 0;
    private static _initialized = false;

    static init(): void {
        if (ScaleHelper._initialized) return;

        let actualW = device.width;
        let actualH = device.height;

        try {
            const img = captureScreen();
            if (img) {
                actualW = img.width;
                actualH = img.height;
                recycleImage(img);
            }
        } catch {
            // 截图失败时使用 device API 的值
        }

        ScaleHelper._screenWidth = actualW;
        ScaleHelper._screenHeight = actualH;
        ScaleHelper._initialized = true;

        Logger.info(TAG, `初始化完成: 截图分辨率=${actualW}x${actualH}`);
    }

    static get screenWidth(): number {
        return ScaleHelper._screenWidth;
    }

    static get screenHeight(): number {
        return ScaleHelper._screenHeight;
    }

    static get isInitialized(): boolean {
        return ScaleHelper._initialized;
    }
}
