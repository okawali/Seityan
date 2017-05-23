import XfBase from '../xunfei/xfBase'
import axios from 'axios'
import {turlingKey} from '../utils/conf'

export default class TurlingRobot {
    private api_url = 'http://www.tuling123.com/openapi/api'
    public xf: XfBase
    public callback: (ret:string) => Promise<void>

    constructor(xf:XfBase) {
        this.xf = xf;
        this.output = this.output.bind(this);
    }

    public async input(str: string) {
        axios.post(this.api_url, { data: {
            key: turlingKey,
            info: str
            // TODO: add userid
        }}).then(value => {
            if (value.status == 200) 
                this.output(value.data.text);
        })
        return 
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