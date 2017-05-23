import ZMRobot from '../zmRobot'
import { ZMPlugin, ZMReturn } from '../zmPlugin'
import { shell } from 'electron'


class GoogleSearch extends ZMPlugin {
    intent = "google"
    public zmRobot: ZMRobot
    public async response(data: ZMReturn, query: string): Promise<string> {
        var mode = this.zmRobot.getContext("name");
        if (mode) {
            if (data.resultCode == "0000" && data.intents.length != 0 && data.intents[0].intent != "google") {
                this.zmRobot.resetContext();
                shell.openExternal("https://www.google.com.hk/search?q=" + encodeURIComponent(query));
                return "为您找到这些信息";
            }
        }
        if (data.entities.length == 0 || data.entities[0].type != 'searchable') {
            // 没有检测到要搜索的对象
            this.zmRobot.changeMode("google");
            return "您想搜什么？";
        }

        // 正确匹配
        shell.openExternal("https://www.google.com.hk/search?q=" + encodeURIComponent(data.entities[0].entity));

        return "为您找到这些信息";
    }
}


class BaiduSearch extends ZMPlugin {
    intent = "baidu"
    public zmRobot: ZMRobot

    public async response(data: ZMReturn, query: string): Promise<string> {
        var mode = this.zmRobot.getContext("name");
        if (mode) {
            if (data.resultCode == "0000" && data.intents.length != 0 && data.intents[0].intent != "baidu") {
                this.zmRobot.resetContext();
                shell.openExternal("https://www.baidu.com/s?wd=" + encodeURIComponent(query));
                return "为您找到这些信息";
            }
        }
        if (data.entities.length == 0 || data.entities[0].type != 'searchable') {
            // 没有检测到要搜索的对象
            this.zmRobot.changeMode("baidu");
            return "您想搜什么？";
        }

        // 正确匹配
        shell.openExternal("https://www.baidu.com/s?wd=" + encodeURIComponent(data.entities[0].entity));

        return "为您找到这些信息";
    }


}

export var baidu = new BaiduSearch();
export var google = new GoogleSearch();