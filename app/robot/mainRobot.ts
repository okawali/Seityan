import XfBase from '../xunfei/xfBase'
import ZMRobot from './zmRobot'

export default class MainRobot {
    public xf: XfBase
    private zmRobot: ZMRobot

    constructor(xf: XfBase) {
        this.xf = xf;
        this.zmRobot = new ZMRobot(xf);
        this.output = this.output.bind(this);
        this.zmRobot.callback = this.output; // 知麻机器人，将其输出接到主机器人的output上
        // this.xf.callback = this.xfInput.bind(this); // 暂时不全把讯飞的输出发给主机器人，改为在main函数中手动调用input
    }

    public async input(str: string) {
        return this.zmRobot.input(str); // 调用知麻机器人
    }

    public async output(str: string) {
        if (!str || str == "") return;
        return this.xf.tts(str);
    }

    private xfInput(str) {
        this.input(str);
    }
}