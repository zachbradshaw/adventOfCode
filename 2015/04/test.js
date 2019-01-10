const assert = require('assert');
const leadingZeroHash = require('./leadingZeroHash');

describe('leadingZeroHash', () => {
    it('should return 609043', () => {
        assert.equal(leadingZeroHash('abcdef', '00000'), 609043);
    });

    it('should return 1048970', () => {
        assert.equal(leadingZeroHash('pqrstuv', '00000'), 1048970);
    });
});
