const path = require("path");
const fs = require("fs");
const util = require("util");
const generateGrid = require("../../lib/generateGrid");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const calculateSlope = (x1, y1, x2, y2) => {
  return Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
};

const partOne = input => {
  const grid = generateGrid(input.split("\n")[0].length, {
    asteroid: false
  });
  input
    .split("\n")
    .join("")
    .split("")
    .forEach((point, index) => {
      if (point === "#") {
        grid[index] = { ...grid[index], asteroid: true };
      }
    });

  for (let i = 0; i < grid.length; i++) {
    let station = grid[i];
    let slopes = {};
    if (station.asteroid) {
      for (let j = 0; j < grid.length; j++) {
        let slope = calculateSlope(grid[i].x, grid[i].y, grid[j].x, grid[j].y);
        if (slope === Math.PI) {
          break;
        }
        if (!slopes.hasOwnProperty(slope)) {
          slopes[slope] = grid[j].asteroid ? true : false;
        } else {
          if (!slope[slope] && grid[j].asteroid) {
            slopes[slope] = true;
          }
        }
      }
    }
    grid[i] = {
      ...grid[i],
      // slopes
      visibleAsteroids: Object.values(slopes).filter(slope => slope).length
    };
  }
  // console.log(util.inspect(grid, false, null, true));
  console.log(grid.sort((a, b) => b.visibleAsteroids - a.visibleAsteroids)[0]);
  // console.log(grid);
};

partOne(input);
