import { Tray, Menu } from "electron";
import * as path from "path";
import { EventEmitter } from "events";

export class AppTray {
    private static readonly MAX_STACK_SIZE = 10;
    private _tray: Electron.Tray;
    private _contextMenu: Electron.Menu;
    private _eventEmitter: EventEmitter;
    private _minimized: boolean;
    private _currentModel: number = 0;
    private _modelLoadStack: string[] = [];

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
            {
                label: "settings",
                click: this.onOpenSettings.bind(this)
            },
            { role: "quit" }
        ]);
        this._tray.setContextMenu(this._contextMenu);
        this._tray.setToolTip("Seityan");
        this._eventEmitter = new EventEmitter();
        this._tray.on("click", this.onTrayClick.bind(this));
        this._modelLoadStack[0] = "blanc";
    }

    on(event: string | symbol, listener: (...args: any[]) => void): AppTray {
        this._eventEmitter.on(event, listener);
        return this;
    }


    restorePrevSelectedModel() {
        var modelIndex = this._currentModel - 1;
        var model = "";
        if (modelIndex < 0) {
            modelIndex += 10;
        }
        this._currentModel = modelIndex;
        model = this._modelLoadStack[modelIndex]

        for (let menu of this._contextMenu.items) {
            if (menu.label == "models") {
                let submenu = menu.submenu as Electron.Menu;
                for (let item of submenu.items) {
                    if (item.label == model) {
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
        this.addToModelStack(menuItem.label);
        this._eventEmitter.emit("loadInternalModel", { name: menuItem.label });
    }

    private onLoadExternalModel(menuItem: Electron.MenuItem,
        browserWindow: Electron.BrowserWindow,
        event: Electron.Event) {
        this.addToModelStack("open model");
        this._eventEmitter.emit("loadExternalModel");
    }

    private onOpenSettings(enuItem: Electron.MenuItem,
        browserWindow: Electron.BrowserWindow,
        event: Electron.Event) {
        this._eventEmitter.emit("openSettings");
    }

    private onTrayClick(modifiers: Electron.Modifiers, bounds: Electron.Rectangle): void {
        if (this._minimized) {
            this._eventEmitter.emit("restore");
        } else {
            this._eventEmitter.emit("minimize");
        }
        this._minimized = !this._minimized;
    }

    private addToModelStack(name: string) {
        this._currentModel++;
        if (this._currentModel >= 10) {
            this._currentModel %= 10;
        }
        this._modelLoadStack[this._currentModel] = name;
    }
}