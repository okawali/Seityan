import "reflect-metadata";

export const symbolRobotAction = Symbol("robotAction");

export function robotAction(name: string, ...args: string[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (descriptor.value) {
            ActionManager.inst.registerClass(target.constructor);
            ActionManager.inst.register(descriptor.value, target.constructor.name, name, args);
        }
    };
}

export interface FunctionDefinion {
    className: string
    func: Function
    chineseName: string
    chineseArgs: string[] 
} 

export default class ActionManager {
    private static _instance = new ActionManager();
    public static get inst() {
        return this._instance;
    }

    constructor() {
        
    }
    
    private class_map = new Map<string, object>();
    private function_map = new Map<string, FunctionDefinion>();

    public registerClass(cons: FunctionConstructor) {
        if (this.class_map.has(cons.name)) return;
        this.class_map.set(cons.name, new cons());
        console.log("class registered", cons.name);
        console.log(cons);
    }

    public register(func: Function, classname: string, name: string, args: string[]) {
        this.function_map.set(name, {
            className: classname,
            func: func,
            chineseName: name,
            chineseArgs: args
        });
        console.log("function registered", name, args);
    }

    public getAction(name: string) {
        return this.function_map.get(name);
    }

    public getThisObj(name: string) {
        return this.class_map.get(name);
    }
}

class CopyActions {
    @robotAction('复制', '复制来源', '复制目标')
    public copy(from: string, to: string) {
        
    }

    @robotAction('移动', '移动来源', '移动目标')
    public move(from: string, to: string) {

    }
}

class MailActions {
    @robotAction('发邮件', '内容')
    public sendMail(to: string, content: string) {

    }

    @robotAction('设定自己的账户', '邮箱', '密码')
    public setupMail(username: string, password: string) {
        
    }
}