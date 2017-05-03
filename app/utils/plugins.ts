import {remote} from 'electron';
const app = remote.app;
const fs = remote.require('fs');
import * as path from 'path';
import axios from 'axios';

export interface Plugin {
    name: string
    version: string
    onActive(store: any):Promise<any>
    onDeactive(store: any):Promise<any>
    onLoaded(): Promise<any>
    __package: any
}

export class Plugins {
    static index_url = "https://github.com/VideoClient/video-client-pm/raw/master/index.json"
    private index: any; // 上面这个json获取下来存这里

    private plugins = {} // 获取到的
    private path: string[] // 搜索路径

    constructor() {
    }

    async load() {
        return new Promise((resolve, reject) => {
            this.path = [path.join(__dirname, '..', 'packages'),
                         path.join(app.getPath('userData'), 'Plugins')];
            
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

            axios.get(Plugins.index_url).then((resp) => {
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
        
    }

}