const fs = require('fs');
const findFloor = require('./findFloor');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
console.log(findFloor(input));
