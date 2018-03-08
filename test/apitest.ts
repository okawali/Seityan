import { expect } from 'chai';
import SentenceAnalyser from '../src/app/xunfei/sentenceAnalyser'

describe('LTP test', function() {
    this.timeout(10000);
    it('should cutting into words', async () => {
        var result
        try{
            result = await SentenceAnalyser.wordCut('我爱北京天安门');
            expect(result.data).not.null;
        } catch(e) {
            console.log(e)
        }
        return;
    })

    it('should get deep analysis', async () => {
        var result
        try{
            result = await SentenceAnalyser.deepAnalyse('我爱北京天安门');
            expect(result.data).not.null;
        } catch(e) {
            console.log(e)
        }
        return;
    })
})