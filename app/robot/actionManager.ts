import "reflect-metadata";

export const symbolRobotAction = Symbol("robotAction");

export function robotAction(name: string, ...args: string[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (descriptor.value) {
            ActionManager.inst.registerClass(target.constructor);
            let types = Reflect.getMetadata("design:paramtypes", target, propertyKey);
            ActionManager.inst.register(descriptor.value, target.constructor.name, name, args, types);
        }
    };
}

export interface FunctionDefinion {
    className: string
    func: Function
    chineseName: string
    chineseArgs: string[] 
    argTypes: any
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

    public register(func: Function, classname: string, name: string, args: string[], types: any) {
        this.function_map.set(name, {
            className: classname,
            func: func,
            chineseName: name,
            chineseArgs: args,
            argTypes: types
        });
        console.log("function registered", name, args, types);
    }

    public getAction(name: string) {
        return this.function_map.get(name);
    }

    public getThisObj(name: string) {
        return this.class_map.get(name);
    }
}

export class Email {
    addr: string;
    server: string;
    constructor(str: string) {
        let data = str.split('@');
        this.addr = data[0];
        this.server = data[1];
    } 
    toString() {
        return this.addr + '@' + this.server;
    }
}

export class Path {
    path: string;
    type: string; // dir, file, link
    exist: boolean;
    constructor(str: string) {
        this.path = str;
    } 
    
}

export class Password {
    data: string;
    constructor(str: string) {
        this.data = str;
    } 
}