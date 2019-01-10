const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let total = 0;
  input.split("\n").forEach(block => {
    const [length, width, height] = block.split("x");
    const sorted = [length, width, height].sort((a, b) => a - b);
    const extraPaper = sorted[0] * sorted[1];

    const surfaceArea = 2 * (length * width + width * height + height * length);
    total += surfaceArea + extraPaper;
  });

  return total;
}

function partTwo(input) {
  let total = 0;
  input.split("\n").forEach(block => {
    const [length, width, height] = block.split("x");
    const asc = [length, width, height].sort((a, b) => a - b);
    const perimeter = asc[0] * 2 + asc[1] * 2;
    const volume = length * width * height;

    total += perimeter + volume;
  });

  return total;
}

// console.log("Part one:", partOne(input));
// console.log("Part two:", partTwo(input));

module.exports = {
  partOne,
  partTwo
};
