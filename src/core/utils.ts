import { OcrHelper, TextTarget } from "../utils/ocr";
import { ClickHelper } from "../utils/click";
import { ScreenHelper } from "../utils/screen";
import { recycleImage } from "../utils/image";

type ConditionFunc = () => boolean;

const POPUP_TARGETS: TextTarget[] = [
    { desc: "弹窗-重试", text: "重试" },
    { desc: "弹窗-以后再说", text: "以后再说" },
];

// export interface TaskPopupConfig {
//     customPopupHandler?: () => boolean;
// }

// export function handleCommonPopups(task?: TaskPopupConfig): boolean {
//     /* const img = ScreenHelper.tryCapture();  这部分先不做处理
//     // if (img) {
//     //     try {
//     //         for (const target of POPUP_TARGETS) {
//     //             const match = OcrHelper.findText(target, img);
//     //             if (match) {
//     //                 ClickHelper.tapCenter(match.bounds);
//     //                 return true;
//     //             }
//     //         }
//     //     } finally {
//     //         recycleImage(img);
//     //     }
//     // }
//     // if (task?.customPopupHandler) {
//     //     return task.customPopupHandler();*/
//     // }
//     return false;
// }

// export function waitForWithPopupGuard(
//   condition: ConditionFunc,
//   timeout: number,
//   interval: number = 500,
//   task?: TaskPopupConfig
// ): boolean {
//   const start = Date.now();
//   while (Date.now() - start < timeout) {
//     if (condition()) return true;
//     handleCommonPopups(task);
//     sleep(interval);
//   }
//   return false;
// }
