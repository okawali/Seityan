import ZMRobot from '../zmRobot'
import {ZMPlugin, ZMReturn} from '../zmPlugin'
import {weatherAppId, weatherAppKey} from '../../utils/conf'
import axios from 'axios'

class Weather extends ZMPlugin {
    intent = "ask_weather"
    public zmRobot: ZMRobot
    public async response(data: ZMReturn, query: string): Promise<string> {
        WeatherAPI.getDaily().then((value)=> {
            console.log(value.data);
        })
        return "为您提供以下天气信息";
    }
}

class WeatherAPI {
    public static url = "http://api.seniverse.com/v3/";
    public static async getNow() {
        return axios.get(this.url+"weather/now.json", {params: {
            key: weatherAppKey,
            location: 'ip',
            language: "zh-Hans",
            unit: 'c'
        }})
    }
    public static async getDaily(start_day: number = 0) {
        return axios.get(this.url+"weather/daily.json", {params: {
            key: weatherAppKey,
            location: 'ip',
            language: "zh-Hans",
            unit: 'c',
            start: start_day
        }})
    }
}

export var weather = new Weather();