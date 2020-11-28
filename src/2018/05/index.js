const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const testInput = "dabAcCaCBAcCcaDA";
function partOne(input) {
  input = input.split("");
  while (true) {
    let didSomething = false;
    for (let i = 0; i < input.length; i++) {
      let lower = input[i].toLowerCase();
      let upper = input[i].toUpperCase();
      if (
        input[i] === lower ? input[i + 1] === upper : input[i + 1] === lower
      ) {
        input = input.slice(0, i).concat(input.slice(i + 2));
        didSomething = true;
        break;
      }
    }
    if (!didSomething) break;
  }
  console.log(input.length);
}

function partTwo(input) {
  input = input.split("");
  let seen = {};
  input.forEach(char => {
    if (!seen.hasOwnProperty(char)) {
      seen[char] = { count: 1, char };
    } else {
      seen[char] = { ...seen[char], count: seen[char].count + 1 };
    }
  });
  console.log(seen);
  console.log(
    Object.keys(seen).reduce((acc, val) => {
      return Math.max(acc.count, val.count);
    })
  );
}

// partOne(input);
partTwo(testInput);
module.exports = {
  partOne
};
