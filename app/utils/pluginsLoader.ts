import {remote} from 'electron';
const app = remote.app;
const fs = remote.require('fs');
import * as path from 'path';
import axios from 'axios';
import {Plugin} from 'robot-api';


export class PluginsLoader {
    static index_url = "https://www.norgerman.com/plugins"
    private index: any; // 上面这个json获取下来存这里

    private plugins = {} // 获取到的
    private path: string[] // 搜索路径


    constructor() {
    }

    async load() {
        return new Promise((resolve, reject) => {
            this.path = [path.join(app.getPath('userData'), 'Plugins')];
            
            console.log(this.path)
            for (let i of this.path) {
                fs.readdir(i, (err, files) => {
                    if (!err)
                        files.forEach(file => {
                            let subdir = path.join(i, file)
                            if (fs.statSync(subdir).isDirectory()) 
                                this.scanPackage(subdir)
                                    .then(v => {
                                        let plugin = this.loadPlugin(subdir)
                                        plugin.__package = v
                                        if (plugin.version == null) plugin.version = v.version
                                        this.plugins[v.name] = plugin
                                        console.log(plugin)
                                    })
                                    .catch(e=> reject(e))
                            });
                })
            }

            axios.get(PluginsLoader.index_url).then((resp) => {
                if (resp.status == 200) {
                    this.index = resp.data;
                    resolve();
                }
                reject();
            });
        })
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

    loadPlugin(p: string) {
        let plugin = remote.require(p)
        console.log(plugin)
        return plugin
    }

    install(name: string) {
        return name;
    }

}