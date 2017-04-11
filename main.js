"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
let win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 490, height: 750, frame: true, show: true, transparent: false, resizable: true });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "sampleApp1", 'sampleApp1.html'),
        protocol: 'file:',
        slashes: true,
    }));
    // win.webContents.openDevTools()
    win.on('closed', () => {
        win = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
