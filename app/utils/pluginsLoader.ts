import {remote} from 'electron';
import * as fs from "fs";
import * as path from 'path';
import axios from 'axios';
import {Plugin} from 'robot-api';
import DecompressZip from 'decompress-zip';
const {download} = remote.require('electron-dl');

export interface indexItem {
    id: number
    name: string
    version: string
    downloadUrl: string
} 

export class PluginsLoader {
    static index_url = "https://www.norgerman.com/plugins"
    private index: {[key: string]: indexItem|undefined} = {} // 上面这个json获取下来存这里

    private plugins: {[key: string]: Plugin|undefined} = {}// 已加载的插件
    private path: string[] // 搜索路径

    constructor() {
        this.path = [path.join(remote.app.getPath('userData'), 'Plugins')];
    }

    async load() {
        if (!fs.existsSync(this.path[0])) {
            fs.mkdirSync(this.path[0]);
        }
        for (let i of this.path) {
            fs.readdir(i, async (err, files) => {
                if (!err)
                    files.forEach(async file => {
                        let subdir = path.join(i, file)
                        if (fs.statSync(subdir).isDirectory()) {
                            let v = await this.scanPackage(subdir)
                            let plugin = await this.loadPlugin(subdir, v)
                            console.log(plugin)
                        }
                    });
                else {
                    fs.mkdir(i);
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
                    else reject(err)
                let d = JSON.parse(data)
                d.pluginPath = p
                resolve(d)
            })
        })
    }

    async loadPlugin(p: string, v: any): Promise<Plugin> {
        let plugin = __non_webpack_require__(p)
        console.log("plugin loaded: ", plugin)
        plugin.__package = v
        if (plugin.name == null) plugin.name = v.name
        if (plugin.version == null) plugin.version = v.version
        this.plugins[plugin.name] = plugin
        return plugin
    }

    async install(name: string) {
        if (this.index[name]) {
            let url = (this.index[name] as indexItem).downloadUrl;
            console.log(this.path[0]);
            let dl = await download(remote.BrowserWindow.getFocusedWindow(), url, 
                    {directory: this.path[0], filename: name+'.zip'})
            let dlpath = path.join(this.path[0], name);
            await this.uncompress(dlpath+'.zip', dlpath);
            fs.unlinkSync(dlpath+'.zip');
            let v = await this.scanPackage(dlpath)
            let plugin = await this.loadPlugin(dlpath, v)
        }
    }

    async uncompress(ZIP_FILE_PATH, DESTINATION_PATH){
        return new Promise<any>((resolve, reject) => {
            var unzipper = new DecompressZip(ZIP_FILE_PATH);

            // Add the event listener
            unzipper.on('error', reject);
            unzipper.on('extract', resolve);

            unzipper.extract({
                path: DESTINATION_PATH,
                strip: 1
            });
        })
    }

    async uninstall(name: string) {
        if (this.index[name]) {
            for (var i in this.path) {
                var path = path.join(i, name);
                if (fs.existsSync(path)) {
                    fs.rmdirSync(path);
                    if (this.plugins[name])
                        this.plugins[name] = undefined;
                    return;
                }
            }
        }
    }

    async updateIndex() {
        return axios.get(PluginsLoader.index_url).then((resp) => {
            if (resp.status == 200) {
                // this.index = resp.data;
                resp.data.forEach((element:indexItem) => {
                    this.index[element.name] = element
                });
                console.log(this.index);
                
                this.install("robot-plugin-test");
            }
        });
    }

    async update(name: string) {
        if (this.index[name] && this.plugins[name] && 
            this.versionCompare((this.index[name] as indexItem).version, (this.plugins[name] as Plugin).version) === 1) {
            this.install(name);
        }
    }

    async updateAll() {

    }


    private versionCompare(v1, v2, options?) {
        var lexicographical = options && options.lexicographical,
            zeroExtend = options && options.zeroExtend,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
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