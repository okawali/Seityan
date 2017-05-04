import {remote} from 'electron';
const fs = remote.require('fs');
import * as path from 'path';
import axios from 'axios';
import {Plugin} from 'robot-api';
const {download} = remote.require('electron-dl');

export interface indexItem {
    id: number
    name: string
    version: string
    downloadUrl: string
} 

export class PluginsLoader {
    static index_url = "https://www.norgerman.com/plugins"
    private index: {[key: string]: indexItem} = {} // 上面这个json获取下来存这里

    private plugins: {[key: string]: Plugin} = {}// 已加载的插件
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
                            let plugin = await this.loadPlugin(subdir)
                            plugin.__package = v
                            if (plugin.name == null) plugin.name = v.name
                            if (plugin.version == null) plugin.version = v.version
                            this.plugins[plugin.name] = plugin
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

    async loadPlugin(p: string): Promise<Plugin> {
        let plugin = __non_webpack_require__(p)
        console.log(plugin)
        return plugin
    }

    async install(name: string) {
        if (this.index[name]) {
            let url = this.index[name].downloadUrl;
            console.log(this.path[0]);
            // axios({
            //     method:'get',
            //     url: url,
            //     responseType:'arraybuffer'
            // }).then(function(response) {
            //     fs.writeFile(download_path,response.data);
            // });
            download(remote.BrowserWindow.getFocusedWindow(), url, 
                    {directory: this.path[0], filename: name+'.zip'})
                .then(dl => console.log(dl.getSavePath()))
                .catch(console.error);
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
            this.versionCompare(this.index[name].version, this.plugins[name].version) === 1) {
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