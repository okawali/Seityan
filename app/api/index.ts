export function test_robot_api(str: string) {
    console.log(`${str} api called`);
}

export * from './plugin'

export class Api {
    static apiVersion = '1.0'

    public static getApiVersion() {
        return this.apiVersion;
    }

    public static getVersion() {
        var pjson = require('../../package.json');
        return pjson.version;
    }
}