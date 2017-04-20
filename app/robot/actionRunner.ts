import ActionManager from './actionManager'
import {Entity} from './zmPlugin'
import ZMRobot from './zmRobot'

export default class ActionRunner {
    public zmRobot: ZMRobot

    // name 是一个intent code
    public async run(name: string, entitys: Entity[]) {
        var args: any[] = []
        var argCount = 0;
        
        let action = ActionManager.inst.getAction(name);
        if (action == undefined) return "Oh, my god! 这个动作咱现在还不会执行啊。"; 

        // 整理并按顺序填写实体信息
        let cargs = action.chineseArgs;
        for (let i in cargs)
            for (let ent of entitys) {
                if (ent.type == cargs[i]) {
                    args[i] = ent.entity;
                    break;
                }
            }

        // 依次收集实体中未获取到的信息
        for (let i in cargs) {
            if (!args[i]) {
                let ans = await this.zmRobot.ask(cargs[i]+"是什么？")
                // let parse = await this.zmRobot.getFromCloud(ans);
                args[i] = ans;
            }
        }

        let func = action.func;
        let that = ActionManager.inst.getThisObj(action.className);
        func.call(that, ...args);
    }
}