import ZMRobot from '../zmRobot'
import {ZMPlugin, ZMReturn} from '../zmPlugin'
import {shell} from 'electron'


class RobotInfo extends ZMPlugin {
    intent = "robot_info"
    public zmRobot: ZMRobot
    public async response(data: ZMReturn, query: string): Promise<string> {
        let ans = await this.zmRobot.ask("谜之二人开发了我，要看看咱的项目主页吗？")
        console.log('ans:', ans);
        let parse = await this.zmRobot.getFromCloud(ans);
        console.log('parse:', ans);
        if (parse.intents[0].intent == 'yes') {
            shell.openExternal("https://github.com/Norgerman/live2d-electron");
            return "如果您是开发者，别忘了star我们一下啊。";
        } else {
            await this.zmRobot.output(await this.zmRobot.response(parse, query));
            return ""
        }
    }
}

export var robot_info = new RobotInfo();