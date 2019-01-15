const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let length = 0;
  input
    .split("\n")
    .forEach(line => (length += line.length - eval(line).length));
  return length;
}

function partTwo(input) {
  let length = 0;
  input
    .split("\n")
    .forEach(line => (length += JSON.stringify(line).length - line.length));
  return length;
}

// console.log("Part One:", partOne(input));
// console.log("Part Two:", partTwo(input));

module.exports = {
  partOne,
  partTwo
};
