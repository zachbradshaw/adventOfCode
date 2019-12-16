const path = require("path");
const fs = require("fs");
const computer = require("../computer");
const data = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

console.log("Part one:", computer([1], data).code);
console.log("Part two:", computer([5], data).code);
