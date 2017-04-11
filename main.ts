import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let win: Electron.BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({ width: 490, height: 750, frame: true, show: true, transparent: false, resizable: true })

    win.loadURL(url.format({
        pathname: path.join(__dirname, "sampleApp1", 'sampleApp1.html'),
        protocol: 'file:',
        slashes: true,
    }))

    // win.webContents.openDevTools()

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