import { Logger, LogLevel } from "../utils/logger";
import { LogStorage } from "../utils/log_storage";

declare const android: any;

function buildLogLayout() {
    return (
        <vertical>
            <linear orientation="horizontal" h="48" gravity="center_vertical">
                <button id="btnBack" text="← 返回" textSize="14sp" marginLeft="4" />
                <text text="运行日志" textSize="18sp" textStyle="bold" layout_weight="1" gravity="center" />
                <button id="btnClearLog" text="清空" textSize="12sp" marginRight="4" />
            </linear>
            <scroll id="logScroll" layout_weight="1" bg="#F5F5F5">
                <text id="logText" text="" textSize="12sp" textColor="#333333" fontFamily="monospace" padding="12" />
            </scroll>
        </vertical>
    );
}

export class LogPage {
    private _onBack: (() => void) | null = null;
    private _listener: ((formatted: string, level: LogLevel) => void) | null = null;
    private _w: any = null;

    show(onBack?: () => void): void {
        this._onBack = onBack || null;
        ui.layout(buildLogLayout());
        this._w = ui;
        this._loadHistory();
        this._bindButtons();
        this._startListening();
    }

    private _loadHistory(): void {
        const history = LogStorage.readAll();
        if (history) {
            this._w.logText.setText(history.trimEnd());
            this._scrollToBottom();
        }
    }

    private _bindButtons(): void {
        const self = this;
        this._w.btnBack.click(() => {
            self._stopListening();
            if (self._onBack) {
                self._onBack();
            }
        });
        this._w.btnClearLog.click(() => {
            LogStorage.clear();
            self._w.logText.setText("");
        });
    }

    private _startListening(): void {
        const self = this;
        this._listener = (formatted: string, _level: LogLevel) => {
            ui.run(() => {
                if (!self._w) return;
                const text = self._w.logText;
                const current = text.text() || "";
                text.setText(current + (current ? "\n" : "") + formatted);
                self._scrollToBottom();
            });
        };
        Logger.addListener(this._listener);
    }

    private _stopListening(): void {
        if (this._listener) {
            Logger.removeListener(this._listener);
            this._listener = null;
        }
    }

    private _scrollToBottom(): void {
        const scroll = this._w.logScroll;
        if (scroll) {
            scroll.post(() => {
                scroll.fullScroll(android.view.View.FOCUS_DOWN);
            });
        }
    }
}
