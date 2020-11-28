const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  const [firstWirePath, secondWirePath] = input.split("\n");

  const getCoords = wirePath => {
    let coordsArray = [];
    let stepArray = [];
    let coords = "0,0";
    let step = { count: 0, coord: "0,0" };
    wirePath.split(",").forEach(instruction => {
      const direction = instruction.substring(0, 1);
      const distance = Number(instruction.substring(1));
      switch (direction) {
        case "R":
          for (let i = 0; i < distance; i++) {
            coords = coords.split(",").map(Number);
            coords = [coords[0] + 1, coords[1]].join(",");
            coordsArray.push(coords);
            step = { ...step, count: step.count + 1, coord: coords };
            stepArray.push(step);
          }
          break;
        case "L":
          for (let i = 0; i < distance; i++) {
            coords = coords.split(",").map(Number);
            coords = [coords[0] - 1, coords[1]].join(",");
            coordsArray.push(coords);
            step = { ...step, count: step.count + 1, coord: coords };
            stepArray.push(step);
          }
          break;
        case "U":
          for (let i = 0; i < distance; i++) {
            coords = coords.split(",").map(Number);
            coords = [coords[0], coords[1] + 1].join(",");
            coordsArray.push(coords);
            step = { ...step, count: step.count + 1, coord: coords };
            stepArray.push(step);
          }
          break;
        case "D":
          for (let i = 0; i < distance; i++) {
            coords = coords.split(",").map(Number);
            coords = [coords[0], coords[1] - 1].join(",");
            coordsArray.push(coords);
            step = { ...step, count: step.count + 1, coord: coords };
            stepArray.push(step);
          }
          break;
      }
    });
    return { coordsArray, stepArray };
  };

  const { coordsArray: firstWireCoords, stepArray: firstWireSteps } = getCoords(
    firstWirePath
  );
  console.log(firstWireCoords.length);

  const {
    coordsArray: secondWireCoords,
    stepArray: secondWireSteps
  } = getCoords(secondWirePath);

  const intersections = [];
  const stepCounts = [];
  for (let i = 0; i < firstWireCoords.length; i++) {
    let position = secondWireCoords.map(i => i).indexOf(firstWireCoords[i]);

    if (position !== -1) {
      intersections.push({
        manhattanDistance: firstWireCoords[i]
          .split(",")
          .map(Number)
          .reduce((a, b) => Math.abs(a) + Math.abs(b)),
        matchingCoord: firstWireCoords[i]
      });
    }
  }
  console.log(intersections.length);

  intersections.forEach(int => {
    const firstWireStep = firstWireSteps.filter(
      step => step.coord === int.matchingCoord
    );
    const secondWireStep = secondWireSteps.filter(
      step => step.coord === int.matchingCoord
    );
    stepCounts.push(firstWireStep[0].count + secondWireStep[0].count);
  });
  // console.log(
  //   "Part one:",
  //   intersections.sort((a, b) => a.manhattanDistance - b.manhattanDistance)[0]
  //     .manhattanDistance
  // );
  // console.log("Part two:", stepCounts.sort((a, b) => a - b)[0]);
}

console.time("Completed in");
partOne(input);
console.timeEnd("Completed in");

module.exports = {
  partOne
};
