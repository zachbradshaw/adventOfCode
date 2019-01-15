const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const locations = [];
const distances = [];
input.split("\n").forEach(line => {
  const stripChars = line.replace(/to|=/g, " ");
  console.log(stripChars.trim().split(" "));
  const [start, end, distance] = stripChars.split(" ");

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
