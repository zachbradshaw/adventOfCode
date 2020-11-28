const path = require("path");
const fs = require("fs");
const input = "1113222113";

const loop = arr => {
  let result = "";
  let duplicates = [];
  arr.forEach((int, i, a) => {
    if (duplicates.length === 0 || duplicates.includes(int)) {
      duplicates.push(int);
    } else {
      result = result + duplicates.length + duplicates[0];
      duplicates = [];
      duplicates.push(int);

      if (i === a.length - 1) {
        result = result + duplicates.length + duplicates[0];
      }
    }
  });
  return result;
};

function partOne(input, iterations) {
  let result;
  for (let i = 0; i < iterations; i++) {
    if (i === 0) {
      result = loop(input.split(""));
    } else {
      result = loop(result.split(""));
    }
  }
  return result.length;
}

// console.log(partOne(input, 40)); // part one
// console.log(partOne(input, 50)); // part two

module.exports = {
  partOne
};
