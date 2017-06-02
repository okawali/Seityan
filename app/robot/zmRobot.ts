import { zhimaAppId } from '../utils/conf'
import axios from 'axios';
import { ZMPlugin, ZMReturn } from './zmPlugin';
import XfBase from '../xunfei/xfBase'
import * as plugins from './plugins'
import ActionManager from './actionManager'
import ActionRunner from './actionRunner'

export default class ZMRobt {
    public callback: (ret: string) => Promise<void>
    public static readonly URL = "http://dev.zhimabot.com:8080/zhimabot/analysis";
    public xf: XfBase

    private _plugins: Map<string, ZMPlugin> = new Map();
    private _context: any = {}; // 这个属性是为plugin下的持续对话设计的
    private _contextMap: Map<string, any> = new Map(); // 这个是用来上下文切换保存用的
    private _runner = new ActionRunner();

    constructor(xf: XfBase) {
        this.xf = xf;
        this._runner.zmRobot = this;
        for (let i in plugins) {
            var plugin = plugins[i];
            if (!(plugin instanceof ZMPlugin)) console.log("error! plugin is null, it can not translate to ZMPlugin");
            this._plugins.set(plugin.intent, plugin);
            plugin.zmRobot = this;
        }
    }

    public changeMode(plugin_name: string) {
        this._context.name = plugin_name;
    }
    public changeContext(context_name: string) {
        this._context = this._contextMap.get(context_name);
    }
    public setContext(key: string, prop: any) {
        this._context[key] = prop;
    }
    public getContext(key: string) {
        return this._context[key];
    }
    public resetContext() {
        this._context = {};
    }

    public async input(str: string) {
        var plugins = this._plugins;
        let data = await this.getFromCloud(str);
        if (this._context['name']) {
            var plugin = plugins.get(this._context['name']);
            if (plugin) {
                return plugin.response(data, str);
            } else console.log("error: plugin can not be found");
        } else {
            return this.response(data, str);
        }
        return "";
    }

    public async getFromCloud(str: string): Promise<ZMReturn> {
        return axios.post(ZMRobt.URL, { appId: zhimaAppId, query: str })
            .then((resp) => {
                return resp.data;
            })
    }

    public async response(data: ZMReturn, query: string): Promise<string> {
        console.log(data);
        if (data.resultCode == "0000") {
            var p = this._plugins.get(data.intents[0].intent);
            if (p) return p.response(data, query); // 如果插件有这个功能，就交给插件
            let v = ActionManager.instance.getAction(data.intents[0].intent)
            if (v) {
                await this._runner.run(data.intents[0].intent, data.entities);
                return "任务完成";
            } else return "好的，我明白了，但我目前还没有这个功能。"; // 理解了，但是还没有这个插件
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