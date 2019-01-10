const assert = require('assert');
const filter_one = require('./filter_one');
const filter_two = require('./filter_two');

const testStrings = [];

describe('filter_one', () => {
    it('should equal 2', () => {
        assert.equal(
            filter_one([
                'ugknbfddgicrmopn',
                'aaa',
                'jchzalrnumimnmhp',
                'haegwjzuvuyypxyu',
                'dvszwmarrgswjxmb'
            ]),
            2
        );
    });
});

describe('filter_two', () => {
    it('should equal 2', () => {
        assert.equal(
            filter_two([
                'qjhvhtzxzqqjkmpb',
                'xxyxx',
                'uurcxstgmygtbstg',
                'ieodomkazucvgmuy'
            ]),
            2
        );
    });
});
