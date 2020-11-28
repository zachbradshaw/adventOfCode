const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();
const permutations = require("../../lib/permutations");

const locationNames = [];
const locations = {};
const routes = [];
input.split("\n").forEach(line => {
  const [start, end, distance] = line.match(/([A-Z])\w+|\d+/g);
  if (locationNames.indexOf(start) < 0) {
    locationNames.push(start);
  }
  if (locationNames.indexOf(end) < 0) {
    locationNames.push(end);
  }
  if (routes.indexOf({ start, end, distance }) < 0) {
    routes.push({ start, end, distance });
  }
});

locationNames.forEach(name => (locations[name] = {}));
routes.forEach(route => {
  if (!locations[route.start].hasOwnProperty(route.end)) {
    locations[route.start] = {
      ...locations[route.start],
      [route.end]: Number(route.distance)
    };
  }
  if (!locations[route.end].hasOwnProperty(route.start)) {
    locations[route.end] = {
      ...locations[route.end],
      [route.start]: Number(route.distance)
    };
  }
});

const distances = [];
permutations(locationNames).forEach(route => {
  let distance = 0;
  route.forEach((stop, i) => {
    if (i !== 0) {
      distance = distance + locations[stop][route[i - 1]];
    }
  });
  distances.push(distance);
});

console.log("Part one:", distances.sort((a, b) => a - b)[0]);
console.log("Part two:", distances.sort((a, b) => b - a)[0]);
