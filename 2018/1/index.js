const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let total = 0;
  input.split("\n").forEach(val => {
    total = eval(`${total} ${val}`);
  });
  return total;
}

function partTwo(input, currentVal = 0, frequencies = {}) {
  let total = currentVal;
  for (let val of input.split("\n")) {
    total = eval(`${total} ${val}`);

    if (!frequencies[total]) {
      frequencies[total] = total;
    } else {
      return total;
    }
  }
  return partTwo(input, total, frequencies);
}

// console.log(partOne(input)); // 497
// console.log(partTwo(input)); // 558

module.exports = {
  partOne,
  partTwo
};
