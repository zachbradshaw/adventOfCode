const assert = require('assert');
const singleSanta = require('./singleSanta');
const multiSanta = require('./multiSanta');

describe('singleSanta', () => {
    it('should return 2', () => {
        assert.equal(singleSanta('>'), 2);
    });

    it('should return 4', () => {
        assert.equal(singleSanta('^>v<'), 4);
    });

    it('should return 2', () => {
        assert.equal(singleSanta('^v^v^v^v^v'), 2);
    });
});

describe('multiSanta', () => {
    it('should return 3', () => {
        assert.equal(multiSanta('^v'), 3);
    });

    it('should return 3', () => {
        assert.equal(multiSanta('^>v<'), 3);
    });

    it('should return 11', () => {
        assert.equal(multiSanta('^v^v^v^v^v'), 11);
    });
});
