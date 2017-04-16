import {zhimaAppId} from '../utils/conf'
import asios from 'axios';
import {ZMPlugin, ZMReturn} from './zmPlugin';
import * as plugins from './plugins'
export default class ZMRobt {
    public callback: (ret:string) => void
    static url = "http://dev.zhimabot.com:8080/zhimabot/analysis";
    private plugins: Map<string, ZMPlugin>;
    constructor() {
        for (let i in plugins) {
            var plugin = plugins[i] as ZMPlugin;
            if (!plugin) console.log("error! plugin is null, it can not translate to ZMPlugin");
            this.plugins.set(plugin.intent, plugin);
            plugin.zmRobot = this;
        }
    }

    public input(str: string, callback?: (ret:string) => void) {
        if (callback) this.callback = callback;
        asios.post(ZMRobt.url, {appId: zhimaAppId, query: str})
            .then((resp)=> {
                this.output(this.response(resp.data));    
            }).catch((reason) => {
                console.log(reason);
            })
    }

    public response(data: ZMReturn): string {
        console.log(data);
        if (data.resultCode == "0000")
            return "好的，我明白了。";
        else
            return "等等，我不太清楚啊！";
    }

    public output(str: string) {
        if (!str) return;
        if (this.callback) this.callback(str);
    }
}