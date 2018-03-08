import { show as showDialog, DialogConfig } from '../utils/dialog'

/**
 * Show dialog in another render process
 * 
 * @param {DialogConfig} options Dialog options, { title: string, form: { name: string, type: string, tips: string } 
 * @returns an object with data of user input {[key:string]: string}
 */
function show(options: DialogConfig) {
    return showDialog(options);
}

/**
 * This method open the dialog for settings and plugins
 * when dialog closed, `then` function called
 * 
 * @returns an object without data
 */
function showSettings() {
    return showDialog({ title: "Settings", form: [{ name: "setting", type: "Settings", tips: "" }] })
}

export var dialog = {show, showSettings}