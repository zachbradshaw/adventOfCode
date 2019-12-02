const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input, noun, verb) {
  const splitInput = input.split(",").map(Number);
  splitInput[1] = noun;
  splitInput[2] = verb;
  for (let i = 0; i < splitInput.length; i += 4) {
    const section = splitInput.slice(i, i + 4);
    let [opcode, leftParam, rightParam, destParam] = section;
    switch (opcode) {
      case 1:
        splitInput[destParam] = splitInput[leftParam] + splitInput[rightParam];
        break;
      case 2:
        splitInput[destParam] = splitInput[leftParam] * splitInput[rightParam];
        break;
      case 99:
        break;
    }
  }
  console.log("Part one:", splitInput[0]);
}

function partTwo() {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const splitInput = input.split(",").map(Number);
      splitInput[1] = noun;
      splitInput[2] = verb;
      for (let i = 0; i < splitInput.length; i += 4) {
        const section = splitInput.slice(i, i + 4);
        let [opcode, leftParam, rightParam, destParam] = section;
        switch (opcode) {
          case 1:
            splitInput[destParam] =
              splitInput[leftParam] + splitInput[rightParam];
            break;
          case 2:
            splitInput[destParam] =
              splitInput[leftParam] * splitInput[rightParam];
            break;
          case 99:
            break;
        }
      }
      if (splitInput[0] === 19690720) {
        console.log("Part two:", 100 * splitInput[1] + splitInput[2]);
        break;
      }
    }
  }
}

partOne(input, 12, 2);
partTwo();

module.exports = {
  partOne,
  partTwo
};
