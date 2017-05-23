import "reflect-metadata";

export const symbolRobotAction = Symbol("robotAction");

export function robotAction(name: string, ...args: string[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        if (descriptor.value) {
            ActionManager.instance.registerClass(target.constructor);
            let types = Reflect.getMetadata("design:paramtypes", target, propertyKey);
            ActionManager.instance.register(descriptor.value, target.constructor.name, name, args, types);
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
    private static readonly INSTANCE = new ActionManager();
    public static get instance() {
        return this.INSTANCE;
    }

    constructor() {

    }

    private _classMap = new Map<string, object>();
    private _functionMap = new Map<string, FunctionDefinion>();

    public registerClass(cons: FunctionConstructor) {
        if (this._classMap.has(cons.name)) return;
        this._classMap.set(cons.name, new cons());
        console.log("class registered", cons.name);
        console.log(cons);
    }

    public register(func: Function, classname: string, name: string, args: string[], types: any) {
        this._functionMap.set(name, {
            className: classname,
            func: func,
            chineseName: name,
            chineseArgs: args,
            argTypes: types
        });
        console.log("function registered", name, args, types);
    }

    public getAction(name: string) {
        return this._functionMap.get(name);
    }

    public getThisObj(name: string) {
        return this._classMap.get(name);
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