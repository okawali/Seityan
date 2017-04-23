declare class CallbackManager {
    public add(clb): number;
    public get(id:number): any;
}

export default class OfflineRecognizer {
    private recognizer
    private recorder
    private callbackManager: CallbackManager
    private audioContext: AudioContext
    private isRecorderReady = false;
    private isRecognizerReady = false;

    constructor() {
        this.callbackManager = new CallbackManager();
        let callbackManager = this.callbackManager; 
        let wordListChinese = this.wordListChinese;
        this.spawnWorker("lib/pocketsphinx/recognizer.js", (worker) => {
            // This is the onmessage function, once the worker is fully loaded
            worker.onmessage = (e) => {
                // This is the case when we have a callback id to be called
                if (e.data.hasOwnProperty('id')) {
                  var clb = callbackManager.get(e.data['id']);
                  var data = {};
                  if ( e.data.hasOwnProperty('data')) data = e.data.data;
                  if (clb) clb(data);
                }
                // This is a case when the recognizer has a new hypothesis
                // Notice that pocketsphinx.js does not yet recognize words
                // encoded in UTF8, so we map them to ASCII strings. Here we
                // display both ASCII and Chinese strings
                if (e.data.hasOwnProperty('hyp')) {
                  var newHyp = e.data.hyp;
                  var newHypChinese = e.data.hyp.split(' ').map(function(x) {return wordListChinese[x];}).join(' ');
                  if (e.data.hasOwnProperty('final') &&  e.data.final) {
                      newHyp = "Final: " + newHyp;
                      newHypChinese = "Final: " + newHypChinese;
                  }
                  console.log(newHypChinese);
                //   updateHyp(newHyp + '<br><br>' + newHypChinese);
                }
                // This is the case when we have an error
                if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
                    console.log("Error in " + e.data.command + " with code " + e.data.code);
                //   updateStatus("Error in " + e.data.command + " with code " + e.data.code);
                }
            };
            // Once the worker is fully loaded, we can call the initialize function
            this.initRecognizer();
        });

        // The following is to initialize Web Audio
        try {
          this.audioContext = new AudioContext();
        } catch (e) {
          console.log("Error initializing Web Audio browser");
        }

    }

    initRecognizer() {
        // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
        // Pay attention here to state the sample rate as the default value is 16kHz and this Chinese acoustic model uses 8kHz
        this.postRecognizerJob({command: 'initialize', data:[["-samprate", "8000"]]},
            () => {
                if (this.recorder) this.recorder.consumers = [this.recognizer];
                this.feedWords(this.wordList);});
    };

    feedWords(words) {
        this.postRecognizerJob({command: 'addWords', data: words},
            () => this.feedGrammar(this.grammars, 0));
    };

    feedGrammar(g, index, id: any = undefined) {
        if (id && (this.grammarIds.length > 0)) this.grammarIds[0].id = id.id;
        if (index < g.length) {
            this.grammarIds.unshift({title: g[index].title})
	        this.postRecognizerJob({command: 'addGrammar', data: g[index].g},
                             (id) => {this.feedGrammar(this.grammars, index + 1, {id:id});});
        } else {
            this.isRecognizerReady = true;
        }
    };

    // A convenience function to post a message to the recognizer and associate
    // a callback to its response
    postRecognizerJob(message, callback) {
        var msg = message || {};
        if (this.callbackManager) msg.callbackId = this.callbackManager.add(callback);
        if (this.recognizer) this.recognizer.postMessage(msg);
    };

    // This function initializes an instance of the recorder
    // it posts a message right away and calls onReady when it
    // is ready so that onmessage can be properly set
    spawnWorker(workerURL: string, onReady: (worker: Worker) => void) {
        this.recognizer = new Worker(workerURL);
        this.recognizer.onmessage = function(event) {
        onReady(this.recognizer);
        };
        // Notice that we pass the name of the pocketsphinx.js file to load
        // as we need the file packaged with the Chinese acoustic model
        this.recognizer.postMessage('pocketsphinx_zh.js');
    };

    // This is the list of words that need to be added to the recognizer
    // This follows the CMU dictionary format and the phone set of the Chinese model
    // These words were taken from model/lm/zh_CN/mandarin_notone.dic
    private wordList = [["ni_hao","n i h ao"], ["ni_hao_ma", "n i h ao m a"], ["zai_jian", "z ai j ian"], ["huan_ying", "h uan y ing"], ["xie_xie", "x ie x ie"], ["ming_tian_jian", "m ing t ian j ian"]];
    private wordListChinese = {"ni_hao": "你好", "ni_hao_ma": "你好吗", "zai_jian": "再见", "huan_ying": "欢迎", "xie_xie": "谢谢", "ming_tian_jian": "明天见"};
    private grammarChineseGreetings = {numStates: 1, start: 0, end: 0, transitions: [{from: 0, to: 0, word: "ni_hao"},{from: 0, to: 0, word: "ni_hao_ma"},{from: 0, to: 0, word: "zai_jian"},{from: 0, to: 0, word: "huan_ying"},{from: 0, to: 0, word: "xie_xie"},{from: 0, to: 0, word: "ming_tian_jian"}]};
    private grammars = [{title: "Chinese Greetings", g: this.grammarChineseGreetings}];
    private grammarIds: any[] = [];

}