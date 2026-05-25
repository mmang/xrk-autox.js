import { Logger } from "./logger";

const TAG = "ScriptGuard";

/**
 * 检测异常是否为脚本中断（用户手动停止或超时）
 *
 * AutoX.js 在脚本被停止时抛出 ScriptInterruptedException，
 * 如果代码 catch 了这个异常后继续执行，会导致脚本"运行结束"后仍在运行。
 *
 * @param e - 捕获的异常
 * @returns true 表示是脚本中断异常
 */
export function isScriptInterrupted(e: unknown): boolean {
    return String(e).includes("ScriptInterruptedException");
}

/**
 * 检测异常是否为脚本中断，如果是则立即终止脚本
 *
 * 在所有 catch 块中调用此函数，防止脚本中断后代码继续执行。
 * 典型用法：
 *   try { ... } catch (e) {
 *       guardScriptInterrupt(e);
 *       // 其他错误处理
 *   }
 */
export function guardScriptInterrupt(e: unknown): void {
    if (isScriptInterrupted(e)) {
        Logger.info(TAG, "脚本已中断，立即退出");
        exit();
    }
}
