import XfBase from '../xunfei/xfBase'
import ZMRobot from './zmRobot'
import TurlingRobot from './turlingRobot'

export default class MainRobot {
    public xf: XfBase
    private zmRobot: ZMRobot
    private turlingRobot: TurlingRobot

    constructor(xf: XfBase) {
        this.xf = xf;
        this.zmRobot = new ZMRobot(xf);
        this.turlingRobot = new TurlingRobot(xf);
        this.output = this.output.bind(this);
        this.zmRobot.callback = this.output;
        this.turlingRobot.callback = this.output;
    }

    public async input(str: string) {
        var task1 = this.zmRobot.input(str); // 调用知麻机器人
        var task2 = this.turlingRobot.input(str);
        var values: string[] = await Promise.all([task1, task2]);
        if (values[0] == "等等，我不太清楚啊！") 
            this.output(values[1]);
        else this.output(values[0]);
    }

    public async output(str: string) {
        if (!str || str == "") return;
        return this.xf.tts(str);
    }

    private xfInput(str: string) {
        this.input(str);
    }
}