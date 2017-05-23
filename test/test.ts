import {expect} from 'chai';
import {Version} from '../app/api'

describe('Version check', function() {
    this.timeout(10000);
    it('should show right api version', () => {
        expect(Version.getApiVersion()).eq('1.0');        
    })

    it('should show right version string', async () => {
        expect(Version.getVersion()).not.null;
    })
})