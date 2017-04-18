export const symbolRobotAction = Symbol("robotAction");

export function robotAction(name: string, ...args: string[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        
    };
}

export class ActionManager {
    private static instance = new ActionManager();
    public static get() {
        return this.instance;
    }

    constructor() {
        
    }
    
}

class CopyAction {
    @robotAction('复制', '复制来源', '复制目标')
    public copy(from: string, to: string) {

    }
}