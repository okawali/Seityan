import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import { AppTray } from "./electronMain/uiElements/AppTray";

let win: Electron.BrowserWindow | null;
let tray: AppTray = new AppTray();

function createWindow() {
    win = new BrowserWindow({ width: 550, height: 860, autoHideMenuBar: true, frame: false, show: true, transparent: true, resizable: true })

    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file:',
        slashes: true,
    }))

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null
    })
}

function onAppReady() {
    createWindow()
}

app.on('ready', createWindow)

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