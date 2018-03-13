const fs = require('fs');
const ribbon = require('./ribbon');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
console.log(ribbon(input));
