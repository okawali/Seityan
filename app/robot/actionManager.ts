import "reflect-metadata";

export const symbolRobotAction = Symbol("robotAction");

export function robotAction(name: string, ...args: string[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (descriptor.value) {
            ActionManager.inst.registerClass(target.constructor);
            ActionManager.inst.register(descriptor.value, name, args);
        }
    };
}

export class ActionManager {
    private static _instance = new ActionManager();
    public static get inst() {
        return this._instance;
    }

    constructor() {
        
    }
    
    private now_class_instance: object;
    private class_map = new Map<string, object>();
    private function_map = new Map<string, Function>();

    registerClass(cons: FunctionConstructor) {
        if (this.class_map.has(cons.name)) return;
        this.class_map.set(cons.name, new cons());
        console.log("class registered", cons.name);
        console.log(cons);
    }

    register(func: Function, name: string, args: string[]) {
        this.function_map.set(name, func);
        console.log("function registered", name, args);
    }
}

class CopyAction {
    @robotAction('复制', '复制来源', '复制目标')
    public copy(from: string, to: string) {
        
    }

    @robotAction('移动', '移动来源', '移动目标')
    public move(from: string, to: string) {

    }
}