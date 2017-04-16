declare class IFlyTtsSession {
    constructor(config: object);
    start(ssb_param:object, content:string, callback: (err:any, obj:any) => any);
    stop();
}

declare class IFlyIatSession {
    constructor(config: object);
    start(ssb_param:object);
    stop();
}

import {xunfeiAppId, xunfeiAppKey} from '../utils/conf';

export default class XfBase {
    public callback: (value) => void
    public audioplay?: (url: string, host?: string) => Promise<void>;

    constructor(audioplay?: (url: string, host?: string) => Promise<void>) {
        this.audioplay = audioplay;
        this.onError = this.onError.bind(this);
        this.onProcess = this.onProcess.bind(this);
        this.onResult = this.onResult.bind(this);
        this.onVolume = this.onVolume.bind(this);
        this.iatSession = new IFlyIatSession({
            "callback":{
                "onResult": this.onResult,
                "onVolume": this.onVolume,
                "onError": this.onError,
                "onProcess": this.onProcess
            }
        });
    }

    public async tts(data: string) {
        return this.play(data, 'vixy', '9');
    }
    public isListening(): boolean {
        return this.mic_open;
    }

    public iatBegin() {
        var ssb_param = {
            "grammar_list": null,
            "params": `appid=${xunfeiAppId},appidkey=${xunfeiAppKey}, lang = sms, acous = anhui, aue=speex-wb;-1, usr = mkchen, ssm = 1, sub = iat, net_type = wifi, rse = utf8, ent =sms16k, rst = plain, auf  = audio/L16;rate=16000, vad_enable = 1, vad_timeout = 5000, vad_speech_tail = 500, compress = igzip`
        };
        this.iat_result = '';
        /* 调用开始录音接口，通过function(volume)和function(err, obj)回调音量和识别结果 */
        this.iatSession.start(ssb_param);
        this.mic_open = true;
        // volumeEvent.start();
        console.log('开始录音...');
    }

    public iatEnd() {
        this.iatSession.stop();
        this.mic_open = false;
        console.log('结束录音');
    }

    private audioPalyUrl = "http://h5.xf-yun.com/audioStream/";

    /**
     * 初始化Session会话
     * url                 连接的服务器地址（可选）
     * reconnection        客户端是否支持断开重连
     * reconnectionDelay   重连支持的延迟时间   
     */
    private session = new IFlyTtsSession({
                                        'url'                : 'ws://h5.xf-yun.com/tts.do',
                                        'reconnection'       : true,
                                        'reconnectionDelay'  : 30000
                                    });
    /* 音频播放对象 */
    private iaudio:HTMLAudioElement;
    /* 音频播放状态 0:未播放且等待音频数据状态，1:正播放且等待音频数据状态，2：未播放且不等待音频数据*/
    private audio_state = 0;
    /***********************************************local Variables**********************************************************/

    /**
     * @content 播放的语音内容
     * @vcn 播音员
     * @spd 速度，1-9，不过怎么感觉没啥用呢
     */
    private async play(content: string, vcn: string, spd: string){
        return new Promise<void>((resolve, reject) => {
            // this.reset();
            
            var ssb_param = {"appid": xunfeiAppId, "appkey": xunfeiAppKey, "synid":"12345", "params" : `ent=aisound,aue=lame,vcn=${vcn},spd=${spd}`};
            var audioPalyUrl = this.audioPalyUrl;
            var iaudio = this.iaudio;
            var audioplay = this.audioplay;
            var session = this.session;
            session.stop();
            session.start(ssb_param, content, function (err, obj)
            {
                var audio_url = obj.audio_url;
                if( audio_url != null && audio_url != undefined )
                {
                    if (audioplay) {
                        session.stop();
                        resolve(audioplay(audio_url, audioPalyUrl));
                    } else {
                        iaudio.src = audioPalyUrl + audio_url;
                        iaudio.play();
                        iaudio.onended = () => {
                            resolve();
                        }
                    }
                }
            });
        });
    };
    /**
     * 停止播放音频
     *
     */
    private stop() {
        this.audio_state = 2;
        this.iaudio.pause();
    }

    private start() {
        this.audio_state = 1;
        this.iaudio.play();
    }

    /**
     * 重置音频缓存队列和播放对象
     * 若音频正在播放，则暂停当前播放对象，创建并使用新的播放对象.
     */
    private reset()
    {
        var audio_array = [];	 
        this.audio_state = 0;
        if(this.iaudio != null)
        {
            this.iaudio.pause();
        }
        this.iaudio = new Audio();
        this.iaudio.src = '';
        //window.iaudio.play();
    };

    /************** iat  ******************/


    private iat_result = "";
    private mic_open = false;

    private onResult(err, result) {
        /* 若回调的err为空或错误码为0，则会话成功，可提取识别结果进行显示*/
        if (err == null || err == undefined || err == 0) {
            if (result == '' || result == null)
                this.iat_result = "没有获取到识别结果";
            else
                this.iat_result = result;
            /* 若回调的err不为空且错误码不为0，则会话失败，可提取错误码 */
        } else {
            this.iat_result = 'error code : ' + err + ", error description : " + result;
        }
        this.mic_open = false;
        console.log('Result: '+this.iat_result);
        this.iatSession.stop();
        if (this.callback) this.callback(this.iat_result);
        // volumeEvent.stop();
    }
    private onProcess(status) {
        switch (status){
            case 'onStart':
                // tip.innerHTML = "服务初始化...";
                break;
            case 'normalVolume':
            case 'started':
                // tip.innerHTML = "倾听中...";
                break;
            case 'onStop':
                // tip.innerHTML = "等待结果...";
                break;
            case 'onEnd':
                // tip.innerHTML = oldText;
                break;
            case 'lowVolume':
                // tip.innerHTML = "倾听中...(声音过小)";
                break;
            default:
                // tip.innerHTML = status;
        }
    }

    private onError() {
        this.mic_open = false;
        // volumeEvent.stop();
    }
    private onVolume(volume) {
        // volumeEvent.listen(volume);
    }
    private iatSession;

}

