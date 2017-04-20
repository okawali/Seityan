import { ipcRenderer } from "electron";

var typeActionMapper: Map<string, ((value?: any, error?: any) => void)[]> = new Map<string, ((value?: any, error?: any) => void)[]>();

export function show<T>(type: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        showDialog<T>(type, (value, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}

function showDialog<T>(type: string, callback: (value?: T, error?: any) => void): void {
    if (typeActionMapper.has(type)) {
        typeActionMapper.get(type)!.push(callback);
    } else {
        typeActionMapper.set(type, [callback]);
    }

    ipcRenderer.send("showDialog", type);
}

function onDiaglogClose(event: Electron.IpcRendererEvent, type: string, value?: any, error?: any) {
    var actions = typeActionMapper.get(type);

    for (var action of actions!) {
        action(value, error);
    }
}

ipcRenderer.on("onDialogClose", onDiaglogClose)