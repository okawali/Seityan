declare class IFlyTtsSession {
    constructor(config: object);
    start(ssb_param:object, content:string, callback: (err:any, obj:any) => any);
}


import {RequestPromise} from 'request-promise-native';
import {appid, appkey} from './conf';

export default class XfBase {
    constructor() {
    }

    public tts(data: string) {
        this.play(data, 'aisxping');
    }

    public iatBegin() {

    }

    public iatEnd() {
        
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

    private play(content, vcn){
        this.reset();
        
        var ssb_param = {"appid": appid, "appkey": appkey, "synid":"12345", "params" : "ent=aisound,aue=lame,vcn="+vcn};
        var audioPalyUrl = this.audioPalyUrl;
        var iaudio = this.iaudio;
        this.session.start(ssb_param, content, function (err, obj)
        {
            var audio_url = audioPalyUrl + obj.audio_url;
            if( audio_url != null && audio_url != undefined )
            {
                iaudio.src = audio_url;
                iaudio.play();
            }
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
}

