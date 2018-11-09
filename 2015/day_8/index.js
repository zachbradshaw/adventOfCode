const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const getStringLength = line => {
  return {
    partOne: line.length - eval(line).length,
    partTwo: JSON.stringify(line).length - line.length
  };
};

let partOne = 0;
let partTwo = 0;
input.split("\n").forEach(line => {
  let length = getStringLength(line);
  partOne += length.partOne;
  partTwo += length.partTwo;
});

console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
