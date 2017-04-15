import { Tray, Menu } from "electron";
import * as path from "path";
import { EventEmitter } from "events";

export class AppTray {
    private _tray: Electron.Tray;
    private _contextMenu: Electron.Menu;
    private _eventEmitter: EventEmitter;
    private _minimized: boolean;
    private _prevSelectedModel: string;

    constructor() {
        var onLoadInternalModelBoundary = this.onLoadInternalModel.bind(this);
        this._minimized = false;
        this._tray = new Tray(path.join(__dirname, "assets", "image", "smallicon.png"));
        this._contextMenu = Menu.buildFromTemplate([
            {
                label: "models",
                submenu: [
                    {
                        label: "blanc",
                        type: "radio",
                        checked: true,
                        click: onLoadInternalModelBoundary
                    },
                    {
                        label: "shizuku",
                        type: "radio",
                        click: onLoadInternalModelBoundary
                    },
                    {
                        label: "neptune",
                        type: "radio",
                        click: onLoadInternalModelBoundary
                    },
                    {
                        label: "open model",
                        type: "radio",
                        click: this.onLoadExternalModel.bind(this)
                    }
                ]
            },
            {
                type: "separator"
            },
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
        this._prevSelectedModel = "blanc";
    }

    on(event: string | symbol, listener: Function): AppTray {
        this._eventEmitter.on(event, listener);
        return this;
    }


    restorePrevSelectedModel() {
        for (let menu of this._contextMenu.items) {
            if (menu.label == "models") {
                let submenu = menu.submenu as Electron.Menu;
                for (let item of submenu.items) {
                    if (item.label == this._prevSelectedModel) {
                        item.checked = true;
                        break;
                    }
                }
            }
        }
    }

    private onAlwaysOnTopChanged(menuItem: Electron.MenuItem,
        browserWindow: Electron.BrowserWindow,
        event: Electron.Event): void {

        this._eventEmitter.emit("setAlwaysTop", menuItem.checked);
    }

    private onLoadInternalModel(menuItem: Electron.MenuItem,
        browserWindow: Electron.BrowserWindow,
        event: Electron.Event) {
        this._prevSelectedModel = menuItem.label;
        this._eventEmitter.emit("loadInternalModel", { name: menuItem.label, buildIn: true });
    }

    private onLoadExternalModel(menuItem: Electron.MenuItem,
        browserWindow: Electron.BrowserWindow,
        event: Electron.Event) {
        this._eventEmitter.emit("loadExternalModel");
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