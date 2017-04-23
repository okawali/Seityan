import { ipcRenderer } from "electron";
import * as uuid from "uuid/v4";
import { Form } from "../dialogs/autoform";

var actionMapper: Map<string, (value?: any, error?: any) => void> = new Map<string, (value?: any, error?: any) => void>();

export function show<T>(options: Form[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        showDialog<T>(options, uuid(), (value, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}

function showDialog<T>(options: Form[], id: string, callback: (value?: T, error?: any) => void): void {
    actionMapper.set(id, callback);

    ipcRenderer.send("showDialog", options, id);
}

function onDiaglogClose(event: Electron.IpcRendererEvent, id: string, value?: any, error?: any) {
    var action = actionMapper.get(id);
    if (action) {
        action(value, error);
        actionMapper.delete(id);
    }
}

ipcRenderer.on("onDialogClose", onDiaglogClose)