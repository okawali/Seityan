export * from './plugin';

export * from "./dialog";

export class Version {
    static apiVersion = '1.0'

    public static getApiVersion() {
        return this.apiVersion;
    }

    public static getVersion() {
        var pjson = require('../../package.json');
        return pjson.version;
    }
}