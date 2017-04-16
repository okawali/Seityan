import XfBase from '../xunfei/xfBase'
import ZMRobot from './zmRobot'

export default class MainRobot {
    public xf: XfBase
    public callback: (ret:string) => void
    private zmRobot: ZMRobot

    constructor(xf:XfBase) {
        this.xf = xf;
        this.zmRobot = new ZMRobot();
        this.output = this.output.bind(this);
        this.zmRobot.callback = this.output;
    }

    public input(str: string, callback?: (ret:string) => void) {
        if (callback) this.callback = callback;
        this.zmRobot.input(str, this.output);
    }

    public output(str: string) {
        this.xf.tts(str);
        if (this.callback) this.callback(str); 
    }
}