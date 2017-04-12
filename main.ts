import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { AppTray } from "./electronMain/uiElements/appTray";

let win: Electron.BrowserWindow | null;
let tray: AppTray;

function createWindow() {
    win = new BrowserWindow({
        width: 550, height: 860,
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

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })

    tray.on("minimize", () => {
        win!.minimize();
    });

    tray.on("restore", () => {
        win!.restore();
    });
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