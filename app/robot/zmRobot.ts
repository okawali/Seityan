import {zhimaAppId} from '../utils/conf'
import asios from 'axios';

export default class ZMRobt {
    public callback: (ret:string) => void
    static url = "http://dev.zhimabot.com:8080/zhimabot/analysis";

    public input(str: string, callback?: (ret:string) => void) {
        if (callback) this.callback = callback;
        asios.post(ZMRobt.url, {appId: zhimaAppId, query: str})
            .then((resp)=> {
                this.output(this.response(resp.data));    
            }).catch((reason) => {
                console.log(reason);
            })
    }

    public response(data: any) {
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