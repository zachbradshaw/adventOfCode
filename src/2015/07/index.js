const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const testInput =
  "123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i";

function partOneAndTwo(input, wires = {}) {
  const splitInput = input.split("\n");
  const operands = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    RSHIFT: (a, b) => a >> b,
    LSHIFT: (a, b) => a << b,
    NOT: (a, b) => b ^ 65535,
    VAL: (a, b) => b
  };

  while (splitInput.length) {
    const [command, a, operand, b, destinationWire] = splitInput
      .shift()
      .match(/([a-z0-9]*)\b\s?([A-Z]+)?\s?(\S+)\s->\s(\S+)/);
    if ([a, b].every(i => !i || wires.hasOwnProperty(i) || /\d+/.test(i))) {
      wires[destinationWire] =
        wires[destinationWire] ||
        operands[operand || "VAL"](...[a, b].map(i => wires[i] || +i));
    } else {
      splitInput.push(command);
    }
  }
  return wires;
}

// console.log("Part one:", partOneAndTwo(input).a);
// console.log("Part two:", partOneAndTwo(input, { b: partOneAndTwo(input) }).a);

module.exports = {
  partOneAndTwo
};
