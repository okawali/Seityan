import asios from 'axios';
import {yyyKey} from '../utils/conf'

export default class SentenceAnalyser {
    private static base_url = "http://ltpapi.voicecloud.cn/analysis/";
    public static async wordCut(str: string) {
        return asios.get(this.base_url, {
            params: {
                text: str,
                pattern: 'ws',
                api_key: yyyKey,
                format: 'json'
            }
        });
    }

    public static async deepAnalyse(str: string) {
        return asios.get(this.base_url, {
            params: {
                text: str,
                pattern: 'all',
                api_key: yyyKey,
                format: 'json'
            }
        });
    }
}