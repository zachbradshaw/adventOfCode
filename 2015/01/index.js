const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let floor = 0;
  input.split("").forEach(char => (char === "(" ? floor++ : floor--));
  return floor;
}

function partTwo(input) {
  let floor = 0;
  let basementIndex = [];

  input.split("").forEach((char, index) => {
    if (char === "(") {
      floor++;
    } else {
      floor--;

      if (floor === -1) {
        basementIndex.push(index + 1);
      }
    }
  });

  return basementIndex[0];
}

console.log("Part one:", partOne(input));
console.log("Part two:", partTwo(input));

module.exports = {
  partOne,
  partTwo
};
