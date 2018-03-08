import { app, BrowserWindow } from 'electron'
import * as fs from "fs";
import * as path from 'path';
import axios from 'axios';
import * as DecompressZip from 'decompress-zip';
import { rimrafAsync } from "./utils/rimraf";

const { download } = require('electron-dl');

interface CompareOptions {
    lexicographical: boolean
    zeroExtend: boolean
}

export class PluginLoader {
    static indexUrl = "https://www.norgerman.com/plugins"
    private index: { [key: string]: Seityan.Plugin.PluginIndexItem | undefined } = {} // 上面这个json获取下来存这里

    private plugins: { [key: string]: Seityan.Plugin.PluginItem | undefined } = {}// 已加载的插件
    private searchPath: string[] // 搜索路径

    constructor() {
        this.searchPath = [path.join(app.getPath('userData'), 'SeityanPlugins')];
    }

    public listAll() {
        return this.index;
    }

    public listInstalled() {
        return this.plugins;
    }

    async load() {
        if (!fs.existsSync(this.searchPath[0])) {
            fs.mkdirSync(this.searchPath[0]);
        }
        for (let i of this.searchPath) {
            fs.readdir(i, async (err, files) => {
                if (!err)
                    files.forEach(async file => {
                        let subdir = path.join(i, file);
                        if (fs.statSync(subdir).isDirectory()) {
                            let v = await this.scanPackage(subdir);
                            let plugin = await this.loadPlugin(subdir, v);
                            console.log(plugin);
                        }
                    });
                else {
                    fs.mkdirSync(i);
                }
            })
        }

        // 尚未加载完插件，即可开始更新索引
        this.updateIndex();
    }

    async scanPackage(p: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(p, 'package.json'), 'utf8', (err, data) => {
                if (err)
                    if (err.code === "ENOENT") return;
                    else reject(err);
                let d = JSON.parse(data);
                d.pluginPath = p;
                resolve(d);
            })
        })
    }

    async loadPlugin(p: string, v: any): Promise<Plugin> {
        console.log("plugin loaded: ", p)
        let pluginClass = __non_webpack_require__(p)
        // TODO: add store object for saving data
        let store = {}
        let plugin = new pluginClass(store);
        console.log(plugin.name);

        plugin.__package = v;
        if (plugin.name == null) plugin.name = v.name;
        if (plugin.version == null) plugin.version = v.version;
        console.log('pluign name: ', plugin.name, v.name);
        this.plugins[plugin.name] = plugin;
        return plugin;
    }

    async install(name: string) {
        if (this.index[name]) {
            let url = (this.index[name] as Seityan.Plugin.PluginIndexItem).downloadUrl;
            let dl = await download(BrowserWindow.getFocusedWindow(), url,
                { directory: this.searchPath[0], filename: name + '.zip' });
            let dlpath = path.join(this.searchPath[0], name);
            await this.uncompress(dlpath + '.zip', dlpath);
            fs.unlinkSync(dlpath + '.zip');
            let v = await this.scanPackage(dlpath);
            let plugin = await this.loadPlugin(dlpath, v);
        }
    }

    async uncompress(zipFile: string, destination: string) {
        return new Promise<any>((resolve, reject) => {
            var unzipper = new DecompressZip(zipFile);

            // Add the event listener
            unzipper.on('error', reject);
            unzipper.on('extract', resolve);

            unzipper.extract({
                path: destination,
                strip: 1
            });
        })
    }

    async uninstall(name: string) {
        if (this.index[name]) {
            for (let i of this.searchPath) {
                let currentPath = path.join(i, name);
                if (fs.existsSync(currentPath)) {
                    await rimrafAsync(currentPath);
                    if (this.plugins[name])
                        delete this.plugins[name];
                    return;
                }
            }
        }
    }

    async updateIndex() {
        return axios.get(PluginLoader.indexUrl).then((resp) => {
            if (resp.status == 200) {
                resp.data.forEach((element: Seityan.Plugin.PluginIndexItem) => {
                    this.index[element.name] = element
                });
            }
        });
    }

    async update(name: string) {
        if (this.index[name] && this.plugins[name] &&
            this.versionCompare((this.index[name] as Seityan.Plugin.PluginIndexItem).version, (this.plugins[name] as Seityan.Plugin.PluginItem).version) === 1) {
            this.install(name);
        }
    }

    async updateAll() {

    }


    private versionCompare(v1: string, v2: string, options?: CompareOptions) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts: string[] | number[] = v1.split('.'),
            v2parts: string[] | number[] = v2.split('.');

        function isValidPart(x: string) {
            return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        if (zeroExtend) {
            while (v1parts.length < v2parts.length) v1parts.push("0");
            while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        if (!lexicographical) {
            v1parts = v1parts.map(Number);
            v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
            if (v2parts.length == i) {
                return 1;
            }

            if (v1parts[i] == v2parts[i]) {
                continue;
            }
            else if (v1parts[i] > v2parts[i]) {
                return 1;
            }
            else {
                return -1;
            }
        }

        if (v1parts.length != v2parts.length) {
            return -1;
        }

        return 0;
    }
}