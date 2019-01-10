const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const locations = [];
const distances = [];
input.split("\n").forEach(line => {
  const splitDistanceString = line.split(" ");
  const start = splitDistanceString[0];
  const end = splitDistanceString[2];
  const distance = splitDistanceString[4];

  if (locations.indexOf(start) < 0) {
    locations.push(start);

    if (locations.indexOf(end) < 0) {
      locations.push(end);
    }
  }

  if (distances.indexOf({ start, end, distance }) < 0) {
    distances.push({ start, end, distance });
  }
});

console.log(locations);
console.log(distances.sort((a, b) => Number(a.distance) - Number(b.distance)));
