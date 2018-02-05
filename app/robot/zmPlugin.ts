import ZMRobot from './zmRobot'

export interface ZMReturn {
    resultCode: string,
    resultMsg: string,
    query: string,
    intents: Intent[],
    entities: Entity[]
}

export interface Intent {
    intent: string,
    score: number
}

export interface Entity {
    type: string,
    entity: any
}

export class ZMPlugin {
    intent!: string
    zmRobot!: ZMRobot
    async response(data: ZMReturn, query: string): Promise<string> {
        return "";
    }
}