import ZMRobot from './zmRobot'

export interface ZMReturn {
    resultCode: string,
    resultMsg:  string,
    query:      string,
    intents:    Intent[],
    entities:   Entity[]
}

export interface Intent {
    intent: string,
    score: number
}

export interface Entity {
    type: string,
    entity: any
}

export interface ZMPlugin {
    intent: string
    zmRobot: ZMRobot
    response(data: ZMReturn): string;
}