import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let win: Electron.BrowserWindow | null;

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