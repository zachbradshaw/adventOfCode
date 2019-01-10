const fs = require('fs');
const paper = require('./paper');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
console.log(paper(input));
