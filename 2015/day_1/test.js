const assert = require('assert');
const findFloor = require('./findFloor');
const findFloorIndex = require('./findFloorIndex');

describe('findFloor', () => {
    it('should return 1', () => {
        assert.equal(findFloor('(()'), 1);
    });

    it('should return -1', () => {
        assert.equal(findFloor('((())))'), -1);
    });
});

describe('findFloorIndex', () => {
    it('should return 5', () => {
        assert.equal(findFloorIndex('(()))'), 5);
    });

    it('should return 3', () => {
        assert.equal(findFloorIndex('())'), 3);
    });
});
