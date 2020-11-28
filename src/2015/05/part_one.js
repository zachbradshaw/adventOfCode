const fs = require('fs');
const filter = require('./filter_one');

const input = fs
    .readFileSync('./input.txt', 'utf8')
    .trim()
    .split('\n');
console.log(filter(input));
