const assert = require('assert');
const generateGrid = require('./generateGrid');
const checkLightCoords = require('./checkLightCoords');
const adjustLights = require('./adjustLights');

describe('generateGrid', () => {
    it('should render a 10 x 10 grid', () => {
        assert.equal(generateGrid(10).length, 100);
    });

    it('should generate objects with correct attrs', () => {
        let firstLight = generateGrid(10)[0];
        assert.deepEqual(firstLight, {
            power: false,
            brightness: 0,
            x: 0,
            y: 0
        });
    });
});

describe('checkLightCoords', () => {
    it('should return true if coordinates are within range', () => {
        let [...coords] = [887, 9, 959, 629];
        let light = { power: false, brightness: 0, x: 888, y: 555 };
        assert.ok(checkLightCoords(light, coords));
    });

    it('should return false if coordinates are outside of range', () => {
        let [...coords] = [887, 9, 959, 629];
        let light = { power: false, brightness: 0, x: 0, y: 0 };
        assert.equal(checkLightCoords(light, coords), false);
    });
});

describe('adjustLights', () => {
    let testInput = [
        'turn on 0,0 through 2, 2',
        'turn on 4,4 through 6,6',
        'turn off 4,4 through 6,6',
        'toggle 4,4 through 5,5'
    ];

    it('should return 13', () => {
        assert.equal(adjustLights(testInput, 10, 'power'), 13);
    });

    it('should return 17', () => {
        assert.equal(adjustLights(testInput, 10, 'brightness'), 17);
    });
});
