const assert = require('assert');
const paper = require('./paper');
const ribbon = require('./ribbon');

describe('paper', () => {
    it('should return 58', () => {
        assert.equal(paper('2x3x4'), 58);
    });

    it('should return 43', () => {
        assert.equal(paper('1x1x10'), 43);
    });
});

describe('ribbon', () => {
    it('should return 34', () => {
        assert.equal(ribbon('2x3x4'), 34);
    });

    it('should return 14', () => {
        assert.equal(ribbon('1x1x10'), 14);
    });
});
