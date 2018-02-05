import ZMRobot from '../zmRobot'
import { ZMPlugin, ZMReturn } from '../zmPlugin'
import { weatherAppId, weatherAppKey } from '../../utils/conf'
import axios from 'axios'
import { show } from '../../utils/dialog'

class Weather extends ZMPlugin {
    public intent = "ask_weather"
    public zmRobot!: ZMRobot
    public async response(data: ZMReturn, query: string): Promise<string> {
        WeatherAPI.getDaily().then((value) => {
            console.log(value.data);
            var daily = value.data.results[0];
            show({ title: 'Weather', weather: { date: 0, data: daily } });
        })
        return "为您提供以下天气信息";
    }
}

class WeatherAPI {
    public static readonly URL = "http://api.seniverse.com/v3/";
    public static async getNow() {
        return axios.get(this.URL + "weather/now.json", {
            params: {
                key: weatherAppKey,
                location: 'ip',
                language: "zh-Hans",
                unit: 'c'
            }
        })
    }
    public static async getDaily(startDay: number = 0) {
        return axios.get(this.URL + "weather/daily.json", {
            params: {
                key: weatherAppKey,
                location: 'ip',
                language: "zh-Hans",
                unit: 'c',
                start: startDay
            }
        })
    }
}

export const weather = new Weather();