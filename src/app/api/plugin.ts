
/**
 * The basic class for plugins, it's also an abstract class
 * Each plugin should inherit this class.
 * 
 * @export
 * @class Plugin
 */
export abstract class Plugin implements Seityan.Plugin.PluginItem {
    constructor(store?: object) {
        this.store = store;
    }

    /**
     * name of this plugin
     * 
     * @type {string}
     * @memberof Plugin
     */
    name!: string

    /**
     * version of this plugin
     * 
     * @type {string}
     * @memberof Plugin
     */
    version!: string

    /**
     * storage of the plugin instance, it will be save automatically when the 
     * plugin deactive 
     * 
     * @type {(object | undefined)}
     * @memberof Plugin
     */
    store: object | undefined


    /**
     * On Activate, it called when the plugin is loading
     * 
     * @param {object} store 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    public async onActivate(store: object): Promise<any> {
        this.store = store;
    }

    /**
     * Callback for save the data
     * 
     * @param {object} store 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    public async onDeactivate(store: object): Promise<any> {
    }

    /**
     * Callback after the plugin loaded
     * 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    public async onLoaded(): Promise<any> {

    }

    /**
     * Install callback, it's only called when the plugin install
     * 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    public async onInstall(): Promise<any> {
        
    }

    /**
     * It contains the raw json object of the package.json of this plugin.
     * 
     * @type {*}
     * @memberof Plugin
     */
    public __package: any
}