import { app, BrowserWindow, ipcMain, dialog, globalShortcut } from "electron";
import * as path from "path";
import * as url from "url";
import * as os from 'os';
import { AppTray } from "./main/uiElements/appTray";
import * as electronDL from 'electron-dl';
import { PluginLoader } from './main/pluginLoader'
import * as RobotAPI from "./app/api";

let win: Electron.BrowserWindow | null;
let dialogWin: Electron.BrowserWindow | null;
let tray: AppTray;

// register electron-dl for all windows
electronDL();

var loader = new PluginLoader();
(global as any)['pluginLoader'] = loader;
(global as any)['RobotAPI'] = RobotAPI;
loader.load();

if (os.platform() == 'linux') {
    app.commandLine.appendSwitch("--enable-transparent-visuals");
    app.commandLine.appendSwitch("--disable-gpu");
}

function createWindow() {
    win = new BrowserWindow({
        width: 300, height: 400,
        autoHideMenuBar: true, frame: false,
        show: true, transparent: true,
        resizable: false, skipTaskbar: true,
        alwaysOnTop: true,
        hasShadow: false,
        icon: os.platform() == 'linux' ? path.join(__dirname, '/assets/image/linux.png') : undefined
    })

    dialogWin = new BrowserWindow({
        width: 600, height: 700,
        autoHideMenuBar: true, frame: false,
        resizable: true, skipTaskbar: true,
        alwaysOnTop: true, show: false,
        transparent: true
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file:',
        slashes: true,
    }))

    dialogWin.loadURL(url.format({
        pathname: path.join(__dirname, "dialog.html"),
        protocol: 'file:',
        slashes: true,
    }))

    win.on('closed', () => {
        win = null
    })

    tray.on("minimize", () => {
        win && win.minimize();
    });

    tray.on("restore", () => {
        win && win.restore();
    });

    tray.on("setAlwaysTop", (value: boolean) => {
        win && win.setAlwaysOnTop(value);
    });

    tray.on("loadInternalModel", (arg: { name: string }) => {
        win && win.webContents.send("loadModel", arg.name, true);
    })

    tray.on("loadExternalModel", _ => {
        dialog.showOpenDialog({
            properties: ["openFile"], filters: [
                { name: "Model", extensions: ["model.json"] },
                { name: "Json", extensions: ["json"] },
                { name: "All Files", extensions: ["*"] }
            ]
        }, files => {
            if (files && files.length > 0) {
                var name = files[0].replace(/\\/g, "/");
                win && win.webContents.send("loadModel", name, false);
            } else {
                tray.restorePrevSelectedModel();
            }
        })
    });

    tray.on("openSettings", () => {
        if (dialogWin) {
            dialogWin.show();
            dialogWin.webContents.send("showDialog", {
                title: "Settings", form: [
                    { name: "settings", type: "Settings", tips: "settings" }
                ]
            }, "settings");
        }
    });

    ipcMain.on("resize", (event: any, arg: any) => {
        win && win.setSize(Math.ceil(arg.width), Math.ceil(arg.height));
    })

    ipcMain.on("showDialog", (event: any, options: any, id: string) => {
        if (dialogWin) {
            dialogWin.show();
            dialogWin.webContents.send("showDialog", options, id);
        }
    })

    ipcMain.on("onDialogClose", (event: any, id: string, value?: any, error?: any) => {
        dialogWin && dialogWin.hide();
        win && win.webContents.send("onDialogClose", id, value, error);
    })

    ipcMain.on("installPlugin", (event: any, id: string, params: any[]) => {
        loader.install(params[0])
            .then(_ => {
                event.sender.send("onLoaderResult", id);
            })
            .catch(error => {
                event.sender.send("onLoaderResult", id, null, error);
            })
    });

    ipcMain.on("unInstallPlugin", (event: any, id: string, params: any[]) => {
        loader.uninstall(params[0])
            .then(_ => {
                event.sender.send("onLoaderResult", id);
            })
            .catch(error => {
                event.sender.send("onLoaderResult", id, null, error);
            })
    });

    ipcMain.on("listAllPlugins", (event: any, id: string, params: any[]) => {
        event.sender.send("onLoaderResult", id, loader.listAll());
    });

    ipcMain.on("listInstalledPlugins", (event: any, id: string, params: any[]) => {
        event.sender.send("onLoaderResult", id, loader.listInstalled());
    });

    ipcMain.on("loadModelFailed", () => {
        tray.restorePrevSelectedModel();
    });

    globalShortcut.register('Alt+Q', () => {
        win && win.webContents.send("start-listening");
    })
}

function onAppReady() {
    tray = new AppTray()
    createWindow()
}

app.on('ready', onAppReady)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
})