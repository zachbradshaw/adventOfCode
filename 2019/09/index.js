const path = require("path");
const fs = require("fs");
const computer = require("../computer");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const partOne = input => {
  console.log("Part one:", computer([1], input).code);
};

const partTwo = input => {
  return console.log("Part two:", computer([2], input).code);
};

console.time("Completed in");
partOne(input);
partTwo(input);
console.timeEnd("Completed in");
