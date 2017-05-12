import {robotAction, Email, Path, Password} from '../actionManager'

export class CopyActions {
    @robotAction('复制', '复制来源', '复制目标')
    public copy(from: string, to: string) {
        
    }

    @robotAction('移动', '移动来源', '移动目标')
    public move(from: string, to: string) {

    }
}

export class MailActions {
    private username: Email;
    private password: string;

    @robotAction('发邮件', '收件人', '内容')
    public sendMail(to: Email, content: string) {
        console.log('发邮件', to, content);
    }

    @robotAction('设定自己的账户', '邮箱', '密码')
    public setupMail(username: Email, password: Password) {
        
    }
}