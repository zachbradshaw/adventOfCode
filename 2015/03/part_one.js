const fs = require('fs');
const singleSanta = require('./singleSanta');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
console.log(singleSanta(input));
