import { Tray, Menu } from "electron";
import * as path from "path";
import { EventEmitter } from "events";

export class AppTray {
    private _tray: Electron.Tray;
    private _contextMenu: Electron.Menu;
    private _eventEmitter: EventEmitter;
    private _minimized: boolean;

    constructor() {
        this._minimized = false;
        this._tray = new Tray(path.join(__dirname, "../../", "image", "icon.png"));
        this._contextMenu = Menu.buildFromTemplate([
            {
                label: "always on top",
                type: "checkbox",
                checked: true,
                click: this.onAlwaysOnTopChanged.bind(this)
            },
            { role: "quit" }
        ]);
        this._tray.setContextMenu(this._contextMenu);
        this._tray.setToolTip("heiheihei");
        this._eventEmitter = new EventEmitter();
        this._tray.on("click", this.onTrayClick.bind(this));
    }

    on(event: string | symbol, listener: Function): AppTray {
        this._eventEmitter.on(event, listener);
        return this;
    }

    private onAlwaysOnTopChanged(menuItem: Electron.MenuItem,
        browserWindow: Electron.BrowserWindow,
        event: Electron.Event): void {

        this._eventEmitter.emit("setAlwaysTop", menuItem.checked);
    }

    private onTrayClick(modifiers: Electron.Modifiers, bounds: Electron.Rectangle): void {
        if (this._minimized) {
            this._eventEmitter.emit("restore");
        } else {
            this._eventEmitter.emit("minimize");
        }
        this._minimized = !this._minimized;
    }
}