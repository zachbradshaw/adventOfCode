const path = require("path");
const fs = require("fs");
const adjustLights = require("./adjustLights");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n");

console.log(adjustLights(input, 1000, "brightness"));
