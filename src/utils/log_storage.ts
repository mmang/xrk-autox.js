const LOG_DIR = files.join(files.getSdcardPath(), "AutoGameFlow", "logs");
const LOG_FILE = files.join(LOG_DIR, "app.log");
const MAX_FILE_SIZE = 512 * 1024;
const TRIM_TARGET = 256 * 1024;

export class LogStorage {
    static appendLine(line: string): void {
        try {
            files.ensureDir(LOG_FILE);
            files.append(LOG_FILE, line + "\n");
            LogStorage.checkRotation();
        } catch (e) {
            console.error("LogStorage.appendLine failed: " + e);
        }
    }

    static readAll(): string {
        try {
            if (!files.exists(LOG_FILE)) return "";
            return files.read(LOG_FILE);
        } catch (e) {
            console.error("LogStorage.readAll failed: " + e);
            return "";
        }
    }

    static clear(): void {
        try {
            if (files.exists(LOG_FILE)) {
                files.remove(LOG_FILE);
            }
        } catch (e) {
            console.error("LogStorage.clear failed: " + e);
        }
    }

    static getFilePath(): string {
        return LOG_FILE;
    }

    private static checkRotation(): void {
        try {
            if (!files.exists(LOG_FILE)) return;
            const content = files.read(LOG_FILE);
            if (content.length < MAX_FILE_SIZE) return;

            const lines = content.split("\n");
            let trimmed = "";
            let totalLen = 0;
            for (let i = lines.length - 1; i >= 0; i--) {
                const lineLen = lines[i].length + 1;
                if (totalLen + lineLen > TRIM_TARGET) break;
                trimmed = lines[i] + "\n" + trimmed;
                totalLen += lineLen;
            }
            files.write(LOG_FILE, trimmed);
        } catch (e) {
            console.error("LogStorage.checkRotation failed: " + e);
        }
    }
}
