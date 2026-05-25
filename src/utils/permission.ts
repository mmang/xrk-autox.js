import { ScreenHelper } from "./screen";

export class PermissionHelper {
    private static _accessibilityReady = false;
    private static _captureReady = false;
    private static _overlayReady = false;

    static get isAccessibilityReady(): boolean {
        return PermissionHelper._accessibilityReady;
    }

    static get isCaptureReady(): boolean {
        return PermissionHelper._captureReady;
    }

    static get isOverlayReady(): boolean {
        return PermissionHelper._overlayReady;
    }

    static waitForAccessibility(timeout: number = 30000): boolean {
        try {
            auto.waitFor();
            PermissionHelper._accessibilityReady = true;
            return true;
        } catch {
            return false;
        }
    }

    static requestScreenCapture(landscape: boolean = false): boolean {
        if (PermissionHelper._captureReady) return true;

        if (device.sdkInt > 28) {
            threads.start(function () {
                packageName("com.android.systemui").text("立即开始").waitFor();
                text("立即开始").click();
            });
            sleep(1000);
        }

        const result = requestScreenCapture(landscape);
        if (result) {
            PermissionHelper._captureReady = true;
            ScreenHelper.markCaptureReady();
        }
        return result;
    }

    static requestOverlay(): boolean {
        if (PermissionHelper._overlayReady) return true;

        if (floaty.checkPermission()) {
            PermissionHelper._overlayReady = true;
            return true;
        }

        floaty.requestPermission();
        sleep(1000);

        if (floaty.checkPermission()) {
            PermissionHelper._overlayReady = true;
            return true;
        }
        return false;
    }

    static requestRuntimePermissions(permissions: string[]): void {
        runtime.requestPermissions(permissions);
    }

    static requestAll(): boolean {
        if (!PermissionHelper.waitForAccessibility()) {
            toastLog("无障碍服务未开启");
            return false;
        }

        if (!PermissionHelper.requestScreenCapture()) {
            toastLog("截图权限获取失败");
            return false;
        }

        return true;
    }

    static ensureAccessibility(): void {
        if (!PermissionHelper._accessibilityReady) {
            PermissionHelper.waitForAccessibility();
        }
    }

    static ensureCapture(): void {
        if (!PermissionHelper._captureReady) {
            PermissionHelper.requestScreenCapture();
        }
    }
}

function packageName(pkg: string): UiSelector {
    return selector().id(pkg);
}
