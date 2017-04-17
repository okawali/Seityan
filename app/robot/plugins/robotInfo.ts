import ZMRobot from '../zmRobot'
import {ZMPlugin, ZMReturn} from '../zmPlugin'
import {shell} from 'electron'


class RobotInfo extends ZMPlugin {
    intent = "robot_info"
    public zmRobot: ZMRobot
    public response(data: ZMReturn, query: string): string {
        var mode = this.zmRobot.getContext("name");
        if (mode) {
            if (data.resultCode == "0000" && data.intents.length != 0 && data.intents[0].intent == "ok") {
                this.zmRobot.resetContext();
                shell.openExternal("https://github.com/Norgerman/live2d-electron");
                return "如果您是开发者，别忘了star我们一下啊。";
            }
        }
        this.zmRobot.changeMode('robot_info');

        return "谜之二人开发了我，要看看咱的项目主页吗？";
    }
}

export var robot_info = new RobotInfo();