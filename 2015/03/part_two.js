const fs = require('fs');
const multiSanta = require('./multiSanta');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
console.log(multiSanta(input));
