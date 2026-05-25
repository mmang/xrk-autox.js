import { recycleImage } from "./image";

export interface FindImageOptions {
    threshold?: number;
    region?: [number, number, number, number];
}

export interface FindColorOptions {
    region?: [number, number, number, number];
    threshold?: number;
}

export interface MultiColorTarget {
    desc: string;
    firstColor: string | number;
    paths: (string | number)[][];
    region?: [number, number, number, number];
    threshold?: number;
}

export function MultiColorTarget(init: { desc: string; firstColor: string | number; paths: (string | number)[][]; region?: [number, number, number, number]; threshold?: number }): MultiColorTarget {
    return init;
}

export class ScreenHelper {
    private static _captureReady = false;

    static get isCaptureReady(): boolean {
        return ScreenHelper._captureReady;
    }

    static requestCapture(landscape: boolean = false): boolean {
        if (ScreenHelper._captureReady) return true;
        const result = requestScreenCapture(landscape);
        if (result) {
            ScreenHelper._captureReady = true;
        }
        return result;
    }

    static markCaptureReady(): void {
        ScreenHelper._captureReady = true;
    }

    static capture(): Image {
        if (!ScreenHelper._captureReady) {
            throw new Error("截图权限未获取，请先调用 requestCapture()");
        }
        return captureScreen();
    }

    static tryCapture(): Image | null {
        try {
            return ScreenHelper.capture();
        } catch {
            return null;
        }
    }

    static findImage(templatePath: string, options?: FindImageOptions): { x: number; y: number } | null {
        const img = ScreenHelper.capture();
        const template = images.load(templatePath);
        try {
            const region = options?.region;
            const result = images.findImage(img, template, {
                threshold: options?.threshold ?? 0.9,
                region: region,
            });
            if (result) return result;
            return null;
        } finally {
            recycleImage(img);
            recycleImage(template);
        }
    }

    static findImageFromBase64(base64: string, options?: FindImageOptions): { x: number; y: number } | null {
        const img = ScreenHelper.capture();
        const template = images.fromBase64(base64);
        try {
            const region = options?.region;
            const result = images.findImage(img, template, {
                threshold: options?.threshold ?? 0.9,
                region: region,
            });
            if (result) return result;
            return null;
        } finally {
            recycleImage(img);
            recycleImage(template);
        }
    }

    static findColor(color: string | number, options?: FindColorOptions): { x: number; y: number } | null {
        const img = ScreenHelper.capture();
        try {
            const region = options?.region;
            const result = images.findColor(img, color, {
                region: region,
                threshold: options?.threshold ?? 4,
            });
            if (result) return result;
            return null;
        } finally {
            recycleImage(img);
        }
    }

    static findMultiColors(config: MultiColorTarget): { x: number; y: number } | null {
        const img = ScreenHelper.capture();
        try {
            return ScreenHelper.findMultiColorsInImg(img, config);
        } finally {
            recycleImage(img);
        }
    }

    static findMultiColorsInImg(img: Image, config: MultiColorTarget): { x: number; y: number } | null {
        const region = config.region;
        const result = images.findMultiColors(img, config.firstColor, config.paths, {
            region: region,
            threshold: config.threshold ?? 4,
        });
        if (result) return result;
        return null;
    }

    static detectsColor(color: string | number, x: number, y: number, threshold?: number): boolean {
        const img = ScreenHelper.capture();
        try {
            return images.detectsColor(img, color, x, y, threshold);
        } finally {
            recycleImage(img);
        }
    }

    static getPixel(x: number, y: number): number {
        const img = ScreenHelper.capture();
        try {
            return images.pixel(img, x, y);
        } finally {
            recycleImage(img);
        }
    }

    static swipe(x1: number, y1: number, x2: number, y2: number, duration: number = 500): void {
        swipe(x1, y1, x2, y2, duration);
    }

    static saveScreenshot(path: string, format?: string, quality?: number): void {
        const img = ScreenHelper.capture();
        try {
            images.save(img, path, format, quality);
        } finally {
            recycleImage(img);
        }
    }
}
