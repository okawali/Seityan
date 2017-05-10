const { app, BrowserWindow, ipcMain } = require("electron");
const os = require('os')
const path = require('path')
const url = require('url')

function createWindow() {
    var win = new BrowserWindow({
        width: 600, height: 700,
        autoHideMenuBar: true, frame: false,
        show: true, transparent: true,
        resizable: false, skipTaskbar: true,
        alwaysOnTop: true,
        hasShadow: false,
        icon: os.platform() == 'linux' ? path.join(__dirname, '/assets/image/linux.png') : undefined
    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../dist/dialog.html"),
        protocol: 'file:',
        slashes: true,
    }))
    win.on('closed', function() {
        win = null
    })
    ipcMain.on("dialogFinishedLoading", function() {
        win.webContents.send("showDialog", [
            {name: '姓名', type: 'String', tips: '输入您的姓名'},
            {name: '密码', type: 'Password', tips: '输入您的密码'},
            {name: '出生日期', type: 'Date', tips: '输入您的生日'},
            {name: '待上传', type: 'File', tips:'待上传的文件'}
        ], '10086');
    })
   
}


app.on('ready', createWindow)

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

