const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf8').trim();
const testInput = [
  "",
  "abc",
  "aaa\"aaa",
  "\x27"
]
const getCodeRepresentationStringLength = input => {
  let total = 0;
  input.split("\n").forEach(line => {
    total += JSON.stringify(line).split('').length;
    if(/\\x([0-9A-F][0-9A-F])/.test(JSON.stringify(line))) {
      console.log('match', JSON.stringify(line))
      total += 3;
    }
  })
  return total;
}

const getInMemoryStringLength = input => {
  let total = 0;
  input.split("\n").forEach(line => {
    total += line.length;
  })
  return total;
}

getCodeRepresentationStringLength(input)
getInMemoryStringLength(input);
console.log(getCodeRepresentationStringLength(input) - getInMemoryStringLength(input));
