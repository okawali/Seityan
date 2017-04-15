import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as url from "url";
import { AppTray } from "./electronMain/uiElements/appTray";

let win: Electron.BrowserWindow | null;
let tray: AppTray;

function createWindow() {
    win = new BrowserWindow({
        width: 300, height: 400,
        autoHideMenuBar: true, frame: false,
        show: true, transparent: true,
        resizable: false, skipTaskbar: true,
        alwaysOnTop: true
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file:',
        slashes: true,
    }))

    win.on('closed', () => {
        win = null
    })

    tray.on("minimize", () => {
        win!.minimize();
    });

    tray.on("restore", () => {
        win!.restore();
    });

    tray.on("setAlwaysTop", (value: boolean) => {
        win!.setAlwaysOnTop(value);
    });

    tray.on("loadInternalModel", (arg: { name: string, buildIn: boolean }) => {
        win!.webContents.send("loadModel", arg.name, arg.buildIn);
    })

    tray.on("loadExternalModel", _ => {
        dialog.showOpenDialog({
            properties: ["openFile"], filters: [
                { name: "Model", extensions: ["model.json"] },
                { name: "Json", extensions: ["json"] },
                {name: "All Files", extensions: ["*"] }
            ]
        }, files => {
            if (files && files.length > 0) {
                var name = files[0].replace(/\\/g, "/");
                tray.setPrevSelectModelAsExternal();
                win!.webContents.send("loadModel", name, false);
            } else {
                tray.restorePrevSelectedModel();
            }
        })
    });

    ipcMain.on("resize", (event, arg) => {
        win!.setSize(Math.ceil(arg.width), Math.ceil(arg.height));
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