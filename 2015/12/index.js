const path = require("path");
const fs = require("fs");
const input = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./input.json"), "utf8").trim()
);

const isObject = possibleObject => !(possibleObject instanceof Array);

function partOne(input) {
  let total = 0;
  JSON.stringify(input)
    .match(/(-?[0-9])+/g)
    .forEach(match => (total += Number(match)));
  console.log("Part one:", total);
}

function partTwo(input) {
  let total = 0;
  const traverse = node => {
    if (node && typeof node === "object") {
      Object.entries(node).forEach(([key, val]) => {
        if (isObject(val) && Object.values(val).includes("red")) {
          val = {};
        }
        traverse(val);
      });
    } else {
      if (typeof node === "number") {
        total += Number(node);
      }
    }
  };
  traverse(input);
  console.log("Part two:", total);
}

partOne(input);
partTwo(input);

module.exports = {
  partOne,
  partTwo
};
