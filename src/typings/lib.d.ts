declare class CallbackManager {
    public add(clb: any): number;
    public get(id: number): any;
}

declare class AudioRecorder {
    constructor(source: any, cfg: any);
    start(data: any): void;
    stop(): void;
    public consumers: any[]
}

declare class VAD {
    constructor(options: any);
    analyser: AnalyserNode
}

declare class IFlyTtsSession {
    constructor(config: object);
    start(ssb_param: object, content?: string, callback?: (err: any, obj: any) => any): void;
    stop(): void;
}

declare const VERSION: string;
