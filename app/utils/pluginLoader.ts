import { ipcRenderer } from "electron";
import * as uuid from "uuid/v4";

var actionMapper: Map<string, (value?: any, error?: any) => void> = new Map<string, (value?: any, error?: any) => void>();


export function install(name: string): Promise<void> {
    return pluginAction<void>("installPlugin", name);
}

export function uninstall(name: string): Promise<void> {
    return pluginAction<void>("unInstallPlugin", name);
}

export function listAll(): Promise<{ [name: string]: Seityan.Plugin.PluginIndexItem | undefined }> {
    return pluginAction<{ [name: string]: Seityan.Plugin.PluginIndexItem | undefined }>("listAllPlugins");
}

export function listInstalled(): Promise<{ [key: string]: Seityan.Plugin.PluginItem | undefined }> {
    return pluginAction<{ [key: string]: Seityan.Plugin.PluginItem | undefined }>("listInstalledPlugins");
}

function pluginAction<T>(action: string, ...params): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        sendAction<T>(action, uuid(), params, (value, error) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
}

function sendAction<T>(action: string, id: string, params: any[], callback: (value?: T, error?: any) => void): void {
    actionMapper.set(id, callback);

    ipcRenderer.send(action, id, params);
}

function onLoaderResult(event: any, id: string, value?: any, error?: any) {
    var action = actionMapper.get(id);
    if (action) {
        action(value, error);
        actionMapper.delete(id);
    }
}

ipcRenderer.on("onLoaderResult", onLoaderResult)