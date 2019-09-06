const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

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

const getAllPossibleRoutes = options => {
  let results = [];
  if (options.length === 1) {
    results.push(options);
    return results;
  }

  for (let i = 0; i < options.length; i++) {
    let firstOption = options[i];
    let optionsLeft = options.slice(0, i).concat(options.slice(i + 1));
    let innerOptions = getAllPossibleRoutes(optionsLeft);
    for (let j = 0; j < innerOptions.length; j++) {
      results.push([firstOption].concat(innerOptions[j]));
    }
  }
  return results;
};

const distances = [];
getAllPossibleRoutes(locationNames).forEach(route => {
  let distance = 0;
  route.forEach((stop, i) => {
    if (i !== 0) {
      distance = distance + locations[stop][route[i - 1]];
    }
  });
  distances.push(distance);
});
console.log(distances.sort((a, b) => b - a)[0]);
