import ZMRobot from '../zmRobot'
import { ZMPlugin, ZMReturn } from '../zmPlugin'
import { shell } from 'electron'


class GoogleSearch extends ZMPlugin {
    intent = "google"
    public zmRobot: ZMRobot
    public async response(data: ZMReturn, query: string): Promise<string> {
        if (data.entities.length == 0 || data.entities[0].type != 'searchable') {
            // 没有检测到要搜索的对象
            let ans = await this.zmRobot.ask('您想搜什么');
            shell.openExternal("https://www.google.com.hk/search?q=" + encodeURIComponent(ans));
        } else {
            // 正确匹配
            shell.openExternal("https://www.google.com.hk/search?q=" + encodeURIComponent(data.entities[0].entity));
        }
        return "为您找到这些信息";
    }
}


class BaiduSearch extends ZMPlugin {
    intent = "baidu"
    public zmRobot: ZMRobot

    public async response(data: ZMReturn, query: string): Promise<string> {
        if (data.entities.length == 0 || data.entities[0].type != 'searchable') {
            // 没有检测到要搜索的对象
            let ans = await this.zmRobot.ask('您想搜什么');
            shell.openExternal("https://www.baidu.com/s?wd=" + encodeURIComponent(ans));
        } else {
            // 正确匹配
            shell.openExternal("https://www.baidu.com/s?wd=" + encodeURIComponent(data.entities[0].entity));
        }
        return "为您找到这些信息";
    }
}

export var baidu = new BaiduSearch();
export var google = new GoogleSearch();