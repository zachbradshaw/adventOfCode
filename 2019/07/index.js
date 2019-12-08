const path = require("path");
const fs = require("fs");
const computer = require("../computer");
const permutations = require("../../lib/permutations");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const partOne = input => {
  const results = [];
  const sequences = permutations([0, 1, 2, 3, 4]);
  sequences.forEach(sequence => {
    let result = null;
    sequence.forEach((setting, index) => {
      if (index === 0) {
        result = computer([setting, 0], input);
      } else {
        result = computer([setting, result.code], input);
      }
    });
    results.push(result);
  });
  console.log("Part one:", results.sort((a, b) => b.code - a.code)[0].code);
};

const partTwo = input => {
  const sequences = permutations([5, 6, 7, 8, 9]);
  const results = [];
  sequences.forEach(sequence => {
    let result = null;

    let amps = [];
    for (let i = 0; i < sequence.length; i++) {
      if (i === 0) {
        result = result = computer([sequence[i], 0], input);
        amps.push(result);
      } else {
        result = computer([sequence[i], result.code], input);
        amps.push(result);
      }
    }

    const loop = amps => {
      for (let i = 0; i < amps.length; i++) {
        if (!amps[i].code) {
          break;
        }
        let previousAmpResult;
        if (i === 0) {
          previousAmpResult = amps[amps.length - 1].code;
        } else {
          previousAmpResult = amps[i - 1].code;
        }
        let result = computer(
          [previousAmpResult],
          amps[i].data,
          amps[i].index,
          amps[i].jumpForward
        );
        if (!result) {
          break;
        }
        results.push(result.code);
        amps[i] = result;
        if (i === amps.length - 1) {
          loop(amps);
        }
      }
    };

    loop(amps);
  });
  console.log("Part two:", results.sort((a, b) => b - a)[0]);
};

console.time("Completed in");
partOne(input);
partTwo(input);
console.timeEnd("Completed in");
