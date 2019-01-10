const fs = require('fs');
const adjustLights = require('./adjustLights');

const input = fs
    .readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n');

console.log(adjustLights(input, 1000, 'brightness'));
