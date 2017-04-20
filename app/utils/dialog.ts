import { ipcRenderer } from "electron";
import * as uuid from "uuid/v4";

var typeActionMapper: Map<string, (value?: any, error?: any) => void> = new Map<string, (value?: any, error?: any) => void>();

export function show<T>(dialogOptions: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        showDialog<T>(dialogOptions, uuid(), (value, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}

function showDialog<T>(dialogOptions: any, id: string, callback: (value?: T, error?: any) => void): void {
    typeActionMapper.set(id, callback);

    ipcRenderer.send("showDialog", dialogOptions);
}

function onDiaglogClose(event: Electron.IpcRendererEvent, id: string, value?: any, error?: any) {
    typeActionMapper.get(id)!();
}

ipcRenderer.on("onDialogClose", onDiaglogClose)