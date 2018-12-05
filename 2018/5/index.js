const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const testInput = "dabAcCaCBAcCcaDA";
function partOne(input) {
  //   console.log("input:", input, input.length);
  //   const result = input.split("").reduce((acc, val, idx, arr) => {
  //     // console.log(acc, val);
  //     // console.log(val, arr[idx + 1]);
  //     if (val === arr[idx + 1]) {
  //       acc.push(val);
  //     } else {
  //       if (arr[idx + 1] && val.toUpperCase() === arr[idx + 1].toUpperCase()) {
  //         arr.splice(idx, 1);
  //       } else {
  //         acc.push(val);
  //       }
  //     }

  //     return acc;
  //   }, []);
  const arr = input.split("");
  const loop = (start = 0, arr) => {
    // console.log(arr.length);
    for (let i = start; i < arr.length; i++) {
      if (arr[i] !== arr[i + 1]) {
        if (arr[i + 1] && arr[i].toUpperCase() === arr[i + 1].toUpperCase()) {
          arr.splice(i, 2);
          loop(arr[i - 1], arr);
        }
      }
    }
  };
  loop(0, arr);

  console.log(arr.length);
}

partOne(input);
module.exports = {
  partOne
};
