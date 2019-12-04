const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const createFlyingGuide = input => {
  let guide = {};
  input.split("\n").forEach(reindeerInfo => {
    const [name, kmPerSecond, flyingTime, restingTime] = reindeerInfo
      .replace(
        /can fly|km\/s|for|seconds, but then must rest for|seconds\./g,
        ""
      )
      .split(" ")
      .filter(i => i !== "");
    guide[name] = { kmPerSecond, flyingTime, restingTime };
  });
  return guide;
};

console.log(createFlyingGuide(input));
