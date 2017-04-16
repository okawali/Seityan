import ZMRobot from '../zmRobot'
import {ZMPlugin, ZMReturn} from '../zmPlugin'

class Weather implements ZMPlugin {
    intent = "ask_weather"
    public zmRobot: ZMRobot
    public response(data: ZMReturn): string {
        return "为您提供以下天气信息";
    }
}

export var weather = new Weather();