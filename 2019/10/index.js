const path = require("path");
const fs = require("fs");
const generateGrid = require("../../lib/generateGrid");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const calculateSlope = (x1, y1, x2, y2) => {
  return Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);
};

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
const asteroids = grid.filter(point => point.asteroid);

const partOne = asteroids => {
  for (let i = 0; i < asteroids.length; i++) {
    let slopes = {};

    for (let j = 0; j < asteroids.length; j++) {
      let slope = calculateSlope(
        asteroids[i].x,
        asteroids[i].y,
        asteroids[j].x,
        asteroids[j].y
      );
      if (slope === Math.PI) {
        break;
      }
      if (!slopes.hasOwnProperty(slope)) {
        slopes[slope] = 1;
      }
    }

    asteroids[i] = {
      ...asteroids[i],
      visibleAsteroids: Object.values(slopes).reduce(
        (acc, curr) => acc + curr,
        0
      )
    };
  }

  const optimalStation = asteroids.sort(
    (a, b) => b.visibleAsteroids - a.visibleAsteroids
  )[0];

  console.log("Part one:", optimalStation);
};

const partTwo = asteroids => {
  const optimalStation = { x: 22, y: 25, slopes: {}, orderedAsteroids: [] };
  let filteredAsteroids = asteroids.filter(a => {
    if (a.x === optimalStation.x) {
      if (a.y === optimalStation.y) {
        return false;
      }
    }
    return a;
  });

  for (let i = 0; i < filteredAsteroids.length; i++) {
    let slope = calculateSlope(
      optimalStation.x,
      optimalStation.y,
      filteredAsteroids[i].x,
      filteredAsteroids[i].y
    );
    if (slope === Math.PI) {
      break;
    }
    if (!optimalStation.slopes.hasOwnProperty(slope)) {
      optimalStation.slopes[slope] = [filteredAsteroids[i]];
    } else {
      optimalStation.slopes[slope].push(filteredAsteroids[i]);
    }
  }

  let sortedSlopes = Object.keys(optimalStation.slopes).sort((a, b) => a - b);
  let startingSlope = sortedSlopes.indexOf("90");
  sortedSlopes.push(...sortedSlopes.splice(0, startingSlope));

  sortedSlopes.forEach(slope => {
    optimalStation.orderedAsteroids.push(
      optimalStation.slopes[slope].reverse()
    );
  });

  let record = {};
  let counter = 1;
  for (i = 0; i < optimalStation.orderedAsteroids.length; i++) {
    if (!optimalStation.orderedAsteroids[i]) {
      i = -1;
    }
    if (optimalStation.orderedAsteroids[i].length === 0) {
      break;
    }
    record[counter] = optimalStation.orderedAsteroids[i].shift();
    counter++;
  }
  console.log("Part two", record[200]);
};

partOne(asteroids);
partTwo(asteroids);
