import { OcrHelper, TextTarget } from "./ocr";
import { Point } from "../config/types";

export class ClickHelper {
    private static _offsetX = 0;
    private static _offsetY = 0;

    static setOffset(x: number, y: number): void {
        ClickHelper._offsetX = x;
        ClickHelper._offsetY = y;
    }

    static tap(x: number, y: number, randomRange: number = 3): void {
        const rx = x + ClickHelper._offsetX + (randomRange ? random(-randomRange, randomRange) : 0);
        const ry = y + ClickHelper._offsetY + (randomRange ? random(-randomRange, randomRange) : 0);
        click(rx, ry);
    }

    static tapPoint(point: Point, randomRange: number = 3): void {
        ClickHelper.tap(point.x, point.y, randomRange);
    }

    static tapCenter(rect: Rect, randomRange: number = 3): void {
        ClickHelper.tap(rect.centerX(), rect.centerY(), randomRange);
    }

    static longPress(x: number, y: number, duration: number = 600): void {
        longClick(x + ClickHelper._offsetX, y + ClickHelper._offsetY);
    }

    static pressAndHold(x: number, y: number, duration: number): void {
        press(x + ClickHelper._offsetX, y + ClickHelper._offsetY, duration);
    }

    static swipe(x1: number, y1: number, x2: number, y2: number, duration: number = 500): void {
        swipe(
            x1 + ClickHelper._offsetX, y1 + ClickHelper._offsetY,
            x2 + ClickHelper._offsetX, y2 + ClickHelper._offsetY,
            duration
        );
    }

    static tapByText(target: TextTarget, img?: Image): boolean {
        return OcrHelper.clickText(target, img);
    }

    static tapByTextContains(target: TextTarget, img?: Image): boolean {
        return OcrHelper.clickText(target, img);
    }

    static multiTap(points: [number, number][], interval: number = 100): void {
        for (const [x, y] of points) {
            ClickHelper.tap(x, y, 0);
            sleep(interval);
        }
    }
}

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
