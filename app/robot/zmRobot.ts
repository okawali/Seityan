import {zhimaAppId} from '../utils/conf'
import axios from 'axios';
import {ZMPlugin, ZMReturn} from './zmPlugin';
import XfBase from '../xunfei/xfBase'
import * as plugins from './plugins'
import ActionManager from './actionManager'

console.log(ActionManager.inst);

export default class ZMRobt {
    public callback: (ret:string) => Promise<void>
    static url = "http://dev.zhimabot.com:8080/zhimabot/analysis";
    private plugins: Map<string, ZMPlugin> = new Map();
    private context: any = {}; // 这个属性是为plugin下的持续对话设计的
    private contextMap: Map<string, any> = new Map(); // 这个是用来上下文切换保存用的
    public xf: XfBase

    constructor(xf: XfBase) {
        this.xf = xf;
        for (let i in plugins) {
            var plugin = plugins[i];
            if (!(plugin instanceof ZMPlugin)) console.log("error! plugin is null, it can not translate to ZMPlugin");
            this.plugins.set(plugin.intent, plugin);
            plugin.zmRobot = this;
        }
    }

    public changeMode(plugin_name: string) {
        this.context.name = plugin_name;
    }
    public changeContext(context_name: string) {
        this.context = this.contextMap.get(context_name);
    } 
    public setContext(key: string, prop: any) {
        this.context[key] = prop;
    }
    public getContext(key: string) {
        return this.context[key];
    }
    public resetContext() {
        this.context = {};
    }

    public async input(str: string) {
        var plugins = this.plugins;
        let data = await this.getFromCloud(str);
        if (this.context['name']) {
            var plugin = plugins.get(this.context['name']);
            if (plugin) {
                let ret = await this.output(await plugin.response(data, str)); 
                return    
            } else console.log("error: plugin can not be found");
        } else {
            let ret = await this.response(data, str);
            return this.output(ret);    
        }
        return 
    }

    public async getFromCloud(str: string): Promise<ZMReturn> {
        return axios.post(ZMRobt.url, {appId: zhimaAppId, query: str})
            .then((resp)=> {
                return resp.data;
            })
    }

    public async response(data: ZMReturn, query: string): Promise<string> {
        console.log(data);
        if (data.resultCode == "0000") {
            var p = this.plugins.get(data.intents[0].intent);
            if (p) return p.response(data, query); // 如果插件有这个功能，就交给插件
            else return "好的，我明白了，但我目前还没有这个功能。"; // 理解了，但是还没有这个插件
        } else
            return "等等，我不太清楚啊！"; // 云端没找到匹配项
    }

    public async ask(str: string) {
        return this.output(str).then(() => {
            return this.xf.iatBegin();
        })
    }

    public async output(str: string) {
        if (!str) return;
        if (this.callback) 
            return this.callback(str);
    }
}