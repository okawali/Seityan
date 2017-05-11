declare interface PluginIndexItem {
    id: number
    name: string
    version: string
    downloadUrl: string
}

declare interface PluginItem {

    name: string

    version: string

    store: object | undefined

    /**
     * On Activate, it called when the plugin is loading
     * 
     * @param {object} store 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    onActivate(store: object): Promise<any>
    /**
     * Callback for save the data
     * 
     * @param {object} store 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    onDeactivate(store: object): Promise<any>

    /**
     * Callback after the plugin loaded
     * 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    onLoaded(): Promise<any>

    /**
     * Install callback, it's only called when the plugin install
     * 
     * @returns {Promise<any>} 
     * @memberof Plugin
     */
    onInstall(): Promise<any>

    /**
     * It contains the raw json object of the package.json of this plugin.
     * 
     * @type {*}
     * @memberof Plugin
     */
    __package: any
}