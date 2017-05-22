import ActionManager from './actionManager'
import {Entity} from './zmPlugin'
import ZMRobot from './zmRobot'
import {show} from '../utils/dialog'
import "./actions";

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
        
        var options: any[] = [];
        console.log(action.argTypes, cargs);
        // 依次收集实体中未获取到的信息
        for (let i in cargs) {
            if (!args[i]) {
                let ans;
                if (action.argTypes[i].name == 'String') {
                    ans = await this.zmRobot.ask(cargs[i]+"是什么？");
                    args[i] = ans;
                } else {
                    options.push({id: i, name: cargs[i], type: action.argTypes[i].name, tips: cargs[i]});
                }
                // let parse = await this.zmRobot.getFromCloud(ans);
            }
        }

        // 一次调用对话框，获取全部参数
        this.zmRobot.output('您还需要提供这些信息');
        console.log(options);
        let data = await show({title: 'Input', form: options});
        for (let i of options) {
            args[i.id] = data[i.name];
        }

        let func = action.func;
        let that = ActionManager.inst.getThisObj(action.className);
        return func.call(that, ...args);
    }
}