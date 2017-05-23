declare class CallbackManager {
    public add(clb): number;
    public get(id:number): any;
}

declare class AudioRecorder {
    constructor(source, cfg);
    start(data);
    stop();
    public consumers: any[]
}

declare class VAD {
    constructor(options);
    analyser: AnalyserNode
}

declare class IFlyTtsSession {
    constructor(config: object);
    start(ssb_param:object, content:string, callback: (err:any, obj:any) => any);
    stop();
}

declare class IFlyIatSession {
    constructor(config: object);
    start(ssb_param:object);
    stop();
}
