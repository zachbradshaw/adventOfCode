const fs = require('fs');
const findFloorIndex = require('./findFloorIndex');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
console.log(findFloorIndex(input));
