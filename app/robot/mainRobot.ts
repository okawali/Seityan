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
        this.zmRobot.callback = this.output; // 知麻机器人，将其输出接到主机器人的output上
        this.xf.callback = this.xfInput.bind(this); // 讯飞的输出接到主机器人的input上
    }

    public input(str: string, callback?: (ret:string) => void) {
        if (callback) this.callback = callback;
        this.zmRobot.input(str); // 调用知麻机器人
    }

    public output(str: string) {
        if (!str) return;
        this.xf.tts(str);
        if (this.callback) this.callback(str); 
    }

    private xfInput(str) {
        this.input(str);
    }
}