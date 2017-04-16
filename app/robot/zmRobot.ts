import {zmAppId} from '../utils/conf'
import asios from 'axios';

export default class ZMRobt {
    public callback: (ret:string) => void
    static url = "http://dev.zhimabot.com:8080/zhimabot/analysis";

    public input(str: string, callback?: (ret:string) => void) {
        if (callback) this.callback = callback;
        asios.post(ZMRobt.url, {appId: zmAppId, query: str})
            .then((resp)=> {
                this.output(resp.data);    
            }).catch((reason) => {
                console.log(reason);
            })
    }

    public output(str: string) {
        if (this.callback) this.callback(str);
    }
}