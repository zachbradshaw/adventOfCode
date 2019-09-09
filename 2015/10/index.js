const path = require("path");
const fs = require("fs");
const input = "111221";

function partOne(input) {
  const look = input.split("");
  let say = "";
  let same = [];
  look.forEach((int, i, arr) => {
    if (same.length === 0 || same.includes(int)) {
      same.push(int);
    } else {
      say = say + same.length + same[0];
      same = [];
      same.push(int);

      if (i === arr.length - 1) {
        say = say + same.length + same[0];
      }
    }
  });
  console.log(say.length);
}

function partTwo(input) {}

partOne(input);

module.exports = {
  partOne,
  partTwo
};
