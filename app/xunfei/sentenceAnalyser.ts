import * as pp from 'request-promise-native';
import {yyyKey} from '../utils/conf'

export default class SentenceAnalyser {
    private base_url = "http://ltpapi.voicecloud.cn/analysis/";
    public async wordCut(str: string) {
        return pp.post(this.base_url, {
            body: {
                text: str,
                pattern: 'ws',
                api_key: yyyKey,
                format: 'json'
            }
        });
    }

    public async deepAnalyse(str: string) {
        return pp.post(this.base_url, {
            body: {
                text: str,
                pattern: 'all',
                api_key: yyyKey,
                format: 'json'
            }
        });
    }
}