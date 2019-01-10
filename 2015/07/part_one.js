const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim()
  .split("\n");

const testInput = [
  "123 -> x",
  "456 -> y",
  "x AND y -> d",
  "x OR y -> e",
  "x LSHIFT 2 -> f",
  "y RSHIFT 2 -> g",
  "NOT x -> h",
  "NOT y -> i"
];

// testInput.forEach((command, i) => {
//   const splitCommand = command.split("->");
//   splitCommand[0].replace(/(AND|OR|LSHIFT|RSHIFT|NOT)/, match => {
//     console.log(match);

//     switch (match) {
//       case "AND":
//         return "&";
//       case "OR":
//         return "|";
//       case "RSHIFT":
//         return ">>";
//       case "LSHIFT":
//         return "<<";
//       case "NOT":
//         return "~";
//     }
//   });
//   console.log(splitCommand.join(""));
// });

const circuit = {};

const replaceOperand = (str, match) => {
  let operand;
  if (match) {
    switch (match[0]) {
      case "AND":
        operand = "&";
        break;
      case "OR":
        operand = "|";
        break;
      case "RSHIFT":
        operand = ">>";
        break;
      case "LSHIFT":
        operand = "<<";
        break;
      default:
        operand = "~";
        break;
    }
    return str.replace(new RegExp(match[0]), operand);
  }

  return str;
};
// console.log(replaceOperand("x AND y -> d", "AND", "&"));
// console.log(replaceOperand("x OR y -> d", "OR", "|"));

const loop = input => {
  input.forEach(command => {
    const commandSplit = command.split("->");
    let commandInfo = {
      command: replaceOperand(
        commandSplit[0].trim(),
        command.match(/\b[A-Z]+\b/g)
      ),
      commandSplit: commandSplit,
      destination: commandSplit[1].trim()
    };
    console.log(commandInfo);

    if (!commandInfo.operator) {
      commandInfo.value = parseInt(command.match(/\b[0-9]+\b/g), 10);
    } else {
      switch (commandInfo.operator[0]) {
        case "AND":
          commandInfo.value =
            circuit[commandInfo.commandSplit[0]] &
            circuit[commandInfo.commandSplit[2]];
          break;
        case "OR":
          commandInfo.value =
            circuit[commandInfo.commandSplit[0]] |
            circuit[commandInfo.commandSplit[2]];
          break;
        case "RSHIFT":
          commandInfo.value =
            circuit[commandInfo.commandSplit[0]] >>>
            commandInfo.commandSplit[2];
          break;
        case "LSHIFT":
          commandInfo.value =
            circuit[commandInfo.commandSplit[0]] << commandInfo.commandSplit[2];
          break;
        case "NOT":
          commandInfo.value = ~(circuit[commandInfo.commandSplit[1]] >>> 0);
          break;
      }
    }

    if (!circuit.hasOwnProperty(commandInfo.destination)) {
      circuit[commandInfo.destination] = commandInfo.value || null;
    } else {
      loop(input);
    }
  });
};

loop(testInput);
console.log(circuit);
console.log(circuit.a);
