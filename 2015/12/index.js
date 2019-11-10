const path = require("path");
const fs = require("fs");
const input = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./input.json"), "utf8").trim()
);

function partOne(input) {
  let total = 0;
  JSON.stringify(input)
    .match(/(-?[0-9])+/g)
    .forEach(match => (total += Number(match)));
  return total;
}

function partTwo(input) {}

console.log(partOne(input));

module.exports = {
  partOne,
  partTwo
};
