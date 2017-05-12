import {robotAction} from '../actionManager'

export class CopyActions {
    @robotAction('复制', '复制来源', '复制目标')
    public copy(from: string, to: string) {
        
    }

    @robotAction('移动', '移动来源', '移动目标')
    public move(from: string, to: string) {

    }
}

export class MailActions {
    @robotAction('发邮件', '内容')
    public sendMail(to: string, content: string) {

    }

    @robotAction('设定自己的账户', '邮箱', '密码')
    public setupMail(username: string, password: string) {
        
    }
}