export enum LogLevel {
    VERBOSE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    NONE = 5,
}

import { LogStorage } from "./log_storage";

export class Logger {
    private static _level: LogLevel = LogLevel.INFO;
    private static _tag: string = "App";
    private static _listeners: ((formatted: string, level: LogLevel) => void)[] = [];

    static setLevel(level: LogLevel): void {
        Logger._level = level;
    }

    static setTag(tag: string): void {
        Logger._tag = tag;
    }

    static addListener(listener: (formatted: string, level: LogLevel) => void): void {
        Logger._listeners.push(listener);
    }

    static removeListener(listener: (formatted: string, level: LogLevel) => void): void {
        const idx = Logger._listeners.indexOf(listener);
        if (idx >= 0) Logger._listeners.splice(idx, 1);
    }

    static verbose(tag: string, message: string): void {
        Logger._log(LogLevel.VERBOSE, tag, message);
    }

    static debug(tag: string, message: string): void {
        Logger._log(LogLevel.DEBUG, tag, message);
    }

    static info(tag: string, message: string): void {
        Logger._log(LogLevel.INFO, tag, message);
    }

    static warn(tag: string, message: string): void {
        Logger._log(LogLevel.WARN, tag, message);
    }

    static error(tag: string, message: string): void {
        Logger._log(LogLevel.ERROR, tag, message);
    }

    private static _log(level: LogLevel, tag: string, message: string): void {
        if (level < Logger._level) return;

        const levelStr = ["V", "D", "I", "W", "E"][level] || "?";
        const now = new Date();
        const time = [
            now.getHours().toString().padStart(2, "0"),
            now.getMinutes().toString().padStart(2, "0"),
            now.getSeconds().toString().padStart(2, "0"),
        ].join(":");
        const formatted = `${time} ${levelStr}/${tag}: ${message}`;

        switch (level) {
            case LogLevel.VERBOSE:
                console.verbose(formatted);
                break;
            case LogLevel.DEBUG:
                log(formatted);
                break;
            case LogLevel.INFO:
                console.info(formatted);
                break;
            case LogLevel.WARN:
                console.warn(formatted);
                break;
            case LogLevel.ERROR:
                console.error(formatted);
                break;
        }

        for (const listener of Logger._listeners) {
            listener(formatted, level);
        }

        LogStorage.appendLine(formatted);
    }
}
