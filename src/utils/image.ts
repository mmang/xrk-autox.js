export function recycleImage(img: Image): void {
    if (img && typeof (img as any).recycle === "function") {
        (img as any).recycle();
    }
}
