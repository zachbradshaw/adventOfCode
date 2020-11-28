const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let houses = ["x: 0 y: 0"];
  let x = 0;
  let y = 0;

  input.split("").forEach((direction, index) => {
    switch (direction) {
      case "^":
        y++;
        break;
      case ">":
        x++;
        break;
      case "v":
        y--;
        break;
      case "<":
        x--;
        break;
    }

    houses.push(`x: ${x} y: ${y}`);
  });

  const uniqueHouses = [...new Set(houses)];
  return uniqueHouses.length;
}

function partTwo(input) {
  let realSanta = {
    houses: ["x: 0 y: 0"],
    x: 0,
    y: 0
  };
  let roboSanta = {
    houses: ["x: 0 y: 0"],
    x: 0,
    y: 0
  };

  input.split("").forEach((direction, index) => {
    const isRealSanta = index % 2 === 0;
    let currentSanta = isRealSanta ? realSanta : roboSanta;

    switch (direction) {
      case "^":
        currentSanta.y++;
        break;
      case ">":
        currentSanta.x++;
        break;
      case "v":
        currentSanta.y--;
        break;
      case "<":
        currentSanta.x--;
        break;
    }

    currentSanta.houses.push(`x: ${currentSanta.x} y: ${currentSanta.y}`);
  });

  const uniqueHouses = [...new Set(realSanta.houses.concat(roboSanta.houses))];
  return uniqueHouses.length;
}

// console.log("Part One:", partOne(input));
// console.log("Part Two:", partTwo(input));

module.exports = {
  partOne,
  partTwo
};
