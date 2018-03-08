import { ZMPlugin } from '../zmPlugin';
import { weather } from './weather'
import { baidu, google } from './search'
import { robot_info } from './robotInfo'

const plugins: { [key: string]: ZMPlugin } = {
    weather: weather,
    robotInfo: robot_info,
    baidu,
    google
};

export = plugins;