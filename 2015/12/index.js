const path = require("path");
const fs = require("fs");
const input = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./input.json"), "utf8").trim()
);

const testCases = [
  [1, 2, 3],
  [1, { c: "red", b: 2 }, 3],
  { d: "red", e: [1, 2, 3, 4], f: 5 },
  [1, "red", 5]
];

const isObject = possibleObject => !(possibleObject instanceof Array);

function partOne(input) {
  let total = 0;
  JSON.stringify(input)
    .match(/(-?[0-9])+/g)
    .forEach(match => (total += Number(match)));
  return total;
}

function partTwo(input) {
  let total = 0;
  Object.keys(input).forEach(key => {
    if (isObject(input[key])) {
      console.log("object");
      // setTimeout(() => {
      //   partTwo(input[key]);
      // });
      console.log(Object.keys(input[key]));
    }
  });
}

// console.log(partOne(input));
partTwo(input);

module.exports = {
  partOne,
  partTwo
};
