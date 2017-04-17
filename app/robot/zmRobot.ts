import {zhimaAppId} from '../utils/conf'
import axios from 'axios';
import {ZMPlugin, ZMReturn} from './zmPlugin';
import * as plugins from './plugins'
export default class ZMRobt {
    public callback: (ret:string) => void
    static url = "http://dev.zhimabot.com:8080/zhimabot/analysis";
    private plugins: Map<string, ZMPlugin> = new Map();
    private context: any = {}; // 这个属性是为plugin下的持续对话设计的
    private contextMap: Map<string, any> = new Map(); // 这个是用来上下文切换保存用的
    
    constructor() {
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

    public input(str: string, callback?: (ret:string) => void) {
        var plugins = this.plugins;
        if (callback) this.callback = callback;
        axios.post(ZMRobt.url, {appId: zhimaAppId, query: str})
            .then((resp)=> {
                if (this.context['name']) {
                    var plugin = plugins.get(this.context['name']);
                    if (plugin)
                        plugin.response(resp.data, str);
                    else console.log("error: plugin can not be found");
                } else {
                    this.output(this.response(resp.data, str));    
                }
            }).catch((reason) => {
                console.log(reason);
            })
    }

    public response(data: ZMReturn, query: string): string {
        console.log(data);
        if (data.resultCode == "0000") {
            var p = this.plugins.get(data.intents[0].intent);
            if (p) return p.response(data, query); // 如果插件有这个功能，就交给插件
            else return "好的，我明白了，但我目前还没有这个功能。"; // 理解了，但是还没有这个插件
        } else
            return "等等，我不太清楚啊！"; // 云端没找到匹配项
    }

    public output(str: string) {
        if (!str) return;
        if (this.callback) this.callback(str);
    }
}