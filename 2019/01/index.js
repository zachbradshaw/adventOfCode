const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let total = 0;
  input.split("\n").forEach(mass => {
    total += Math.floor(mass / 3) - 2;
  });
  console.log(total);
}

function partTwo(input) {
  let total = 0;
  const loop = mass => {
    let fuel = Math.floor(mass / 3) - 2;

    if (fuel >= 0) {
      total += fuel;
      loop(fuel);
    }
  };
  input.split("\n").forEach(loop);
  console.log(total);
}

partOne(input);
partTwo(input);
