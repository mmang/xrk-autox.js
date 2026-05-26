# AutoGameFlow

保卫向日葵手游自动化脚本，基于 AutoX.js 运行。

## 环境要求

- Android 手机
- [AutoX.js v7](https://github.com/aiselp/AutoX)（本项目已附带 APK：`org.autojs.autoxjs.v7.apk`）


## 快速开始

百度网盘提供了 AutoX.js APK 和编译好的 `main.js`，可直接下载使用：

- 链接: https://pan.baidu.com/s/1LdBSjqPIyymj5c8ZyGfdqg?pwd=mhd4
- 提取码: mhd4

## 安装 AutoX.js

1. 手机开启 USB 调试模式
2. 通过 ADB 安装：
   ```bash
   adb install org.autojs.autoxjs.v7.apk
   ```
   或直接拷贝 APK 到手机手动安装

## 运行脚本

### 方式一：通过 AutoX.js App 运行

1. 打开 AutoX.js App，授予无障碍服务和截图权限
2. 将 `main.js` 导入到 AutoX.js 的脚本目录
3. 在 App 内点击运行

### 方式二：通过项目源码构建

```bash
# 安装依赖
npm install

# 开发模式（实时编译）
npm run dev

# 生产构建
npm run build
```

构建产物输出到 `dist/main.js`。

## 功能
- 每日任务：体力购买、商店购买、快速游历等
- 副本任务：深渊领主（只扫荡）、竞技对决（没用了）、每日副本、精英挑战等
- 公会任务：公会协助、公会发言、公会捐赠、公会猎魔入侵等

只适配了1080x2400分辨率的挖孔屏真机，同分辨率全面屏和模拟器未测试（这种可能没有前置摄像头，状态栏那里可能不会显示一块黑的区域，坐标会偏移）。

