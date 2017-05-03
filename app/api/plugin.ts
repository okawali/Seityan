
export class Plugin {
    constructor(store?: object) {
        this.store = store;
    }

    name: string
    version: string
    store: object | undefined

    public getName() {return this.name}

    public getVersion() {return this.version}

    public getStore() {return this.store}

    public async onActive(store: object): Promise<any> {
        this.store = store;
    }

    public async onDeactive(store: object): Promise<any> {
        this.store = undefined;
    }

    public async onLoaded(): Promise<any> {

    }

    public async onInstall(): Promise<any> {
        
    }

    public __package: any
}