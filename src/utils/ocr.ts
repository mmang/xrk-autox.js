import { ScreenHelper } from "./screen";
import { recycleImage } from "./image";
import { Logger } from "./logger";

const TAG = "OCR";

export type OcrEngine = "paddle" | "gmlkit";

export interface OcrConfig {
    engine: OcrEngine;
    language: string;
}

const DEFAULT_OCR_CONFIG: OcrConfig = {
    engine: "paddle",
    language: "zh",
};

let ocrConfig: OcrConfig = { ...DEFAULT_OCR_CONFIG };
let paddleAvailable: boolean | null = null;

export function setOcrConfig(config: Partial<OcrConfig>): void {
    if (config.engine !== undefined) ocrConfig.engine = config.engine;
    if (config.language !== undefined) ocrConfig.language = config.language;
}

export function getOcrConfig(): OcrConfig {
    return { ...ocrConfig };
}

export interface TextRegion {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface TextTarget {
    desc: string;
    text: string;
    region?: TextRegion;
}

export function TextTarget(init: { desc: string; text: string; region?: TextRegion }): TextTarget {
    return init;
}

export interface OcrMatchResult {
    text: string;
    bounds: Rect;
    confidence: number;
}

interface PlainBounds {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

function toRect(b: PlainBounds): Rect {
    return {
        left: b.left,
        top: b.top,
        right: b.right,
        bottom: b.bottom,
        width: () => b.right - b.left,
        height: () => b.bottom - b.top,
        centerX: () => Math.round((b.left + b.right) / 2),
        centerY: () => Math.round((b.top + b.bottom) / 2),
    };
}

function offsetRect(rect: Rect, dx: number, dy: number): Rect {
    const l = rect.left + dx;
    const t = rect.top + dy;
    const r = rect.right + dx;
    const bt = rect.bottom + dy;
    return {
        left: l,
        top: t,
        right: r,
        bottom: bt,
        width: () => r - l,
        height: () => bt - t,
        centerX: () => Math.round((l + r) / 2),
        centerY: () => Math.round((t + bt) / 2),
    };
}

function checkPaddleAvailable(): boolean {
    if (paddleAvailable !== null) return paddleAvailable;
    try {
        paddle.ocr(ScreenHelper.capture());
        paddleAvailable = true;
    } catch (e) {
        Logger.warn(TAG, "Paddle OCR 不可用，自动降级到 gmlkit: " + e);
        paddleAvailable = false;
    }
    return paddleAvailable;
}

function getEffectiveEngine(): OcrEngine {
    if (ocrConfig.engine === "gmlkit") return "gmlkit";
    return checkPaddleAvailable() ? "paddle" : "gmlkit";
}

function recognizeWithPaddle(img: Image): OcrMatchResult[] {
    const raw: OcrResult[] = paddle.ocr(img);
    return (raw || []).map((item) => ({
        text: item.words,
        bounds: toRect(item.bounds),
        confidence: item.confidence,
    }));
}

function recognizeWithGmlkit(img: Image): OcrMatchResult[] {
    const result: GmlkitOcrResult = gmlkit.ocr(img, ocrConfig.language);
    if (!result || !result.blocks) return [];
    return result.blocks.map((block) => ({
        text: block.text,
        bounds: toRect(block.bounds),
        confidence: 1.0,
    }));
}

function recognizeTextsWithPaddle(img: Image): string[] {
    const result = paddle.ocrText(img);
    return result || [];
}

function recognizeTextsWithGmlkit(img: Image): string[] {
    const result: GmlkitOcrResult = gmlkit.ocr(img, ocrConfig.language);
    if (!result) return [];
    if (result.blocks) return result.blocks.map((b) => b.text);
    if (result.text) return [result.text];
    return [];
}

export class OcrHelper {
    static recognize(img?: Image): OcrMatchResult[] {
        const target = img || ScreenHelper.capture();
        const engine = getEffectiveEngine();
        const results = engine === "gmlkit"
            ? recognizeWithGmlkit(target)
            : recognizeWithPaddle(target);
        if (!img) recycleImage(target);
        return results;
    }

    static recognizeInRegion(region: TextRegion, img?: Image): OcrMatchResult[] {
        const target = img || ScreenHelper.capture();
        const ownImg = !img;
        try {
            // region 已经是实际设备坐标，直接裁剪
            const clipped = images.clip(target, region.x, region.y, region.w, region.h);
            const engine = getEffectiveEngine();
            const results = engine === "gmlkit"
                ? recognizeWithGmlkit(clipped)
                : recognizeWithPaddle(clipped);
            recycleImage(clipped);
            return results.map((item) => {
                // 子图坐标 → 全图坐标（实际坐标，无需缩放）
                const fullLeft = item.bounds.left + region.x;
                const fullTop = item.bounds.top + region.y;
                const fullRight = item.bounds.right + region.x;
                const fullBottom = item.bounds.bottom + region.y;
                return {
                    text: item.text,
                    bounds: toRect({ left: fullLeft, top: fullTop, right: fullRight, bottom: fullBottom }),
                    confidence: item.confidence,
                };
            });
        } finally {
            if (ownImg) recycleImage(target);
        }
    }

    static recognizeTexts(img?: Image): string[] {
        const target = img || ScreenHelper.capture();
        const engine = getEffectiveEngine();
        const results = engine === "gmlkit"
            ? recognizeTextsWithGmlkit(target)
            : recognizeTextsWithPaddle(target);
        if (!img) recycleImage(target);
        return results;
    }

    static recognizeTextsInRegion(region: TextRegion, img?: Image): string[] {
        const results = OcrHelper.recognizeInRegion(region, img);
        return results.map((r) => r.text);
    }

    static findText(target: TextTarget, img?: Image): OcrMatchResult | null {
        const results = target.region
            ? OcrHelper.recognizeInRegion(target.region, img)
            : OcrHelper.recognize(img);
        for (const item of results) {
            if (item.text.includes(target.text)) {
                return item;
            }
        }
        return null;
    }

    static findTextExact(target: TextTarget, img?: Image): OcrMatchResult | null {
        const results = target.region
            ? OcrHelper.recognizeInRegion(target.region, img)
            : OcrHelper.recognize(img);
        for (const item of results) {
            if (item.text === target.text) {
                return item;
            }
        }
        return null;
    }

    static hasText(target: TextTarget, img?: Image): boolean {
        return OcrHelper.findText(target, img) !== null;
    }

    static hasTextExact(target: TextTarget, img?: Image): boolean {
        return OcrHelper.findTextExact(target, img) !== null;
    }

    static findAllTexts(target: TextTarget, img?: Image): OcrMatchResult[] {
        const results = target.region
            ? OcrHelper.recognizeInRegion(target.region, img)
            : OcrHelper.recognize(img);
        return results.filter((item) => item.text.includes(target.text));
    }

    static clickText(target: TextTarget, img?: Image): boolean {
        const match = OcrHelper.findText(target, img);
        if (match) {
            // match.bounds 已经是实际坐标，直接点击
            click(match.bounds.centerX(), match.bounds.centerY());
            return true;
        }
        return false;
    }
}
