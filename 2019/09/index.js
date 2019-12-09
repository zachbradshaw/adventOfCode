const path = require("path");
const fs = require("fs");
const computer = require("../computer");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const partOne = input => {
  return computer([1], input);
};

console.log(partOne(input));
