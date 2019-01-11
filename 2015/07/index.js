const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const testInput =
  "123 -> x\n456 -> y\nx AND y -> d\nx OR y -> e\nx LSHIFT 2 -> f\ny RSHIFT 2 -> g\nNOT x -> h\nNOT y -> i";

console.log(
  testInput
    .split("\n")
    .forEach(i =>
      i.shift().match(/([a-z0-9]*)\b\s?([A-Z]+)?\s?(\S+)\s->\s(\S+)/)
    )
);

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

// const circuit = {};

// const replaceOperand = (str, match) => {
//   let operand;
//   if (match) {
//     switch (match[0]) {
//       case "AND":
//         operand = "&";
//         break;
//       case "OR":
//         operand = "|";
//         break;
//       case "RSHIFT":
//         operand = ">>";
//         break;
//       case "LSHIFT":
//         operand = "<<";
//         break;
//       default:
//         operand = "~";
//         break;
//     }
//     return str.replace(new RegExp(match[0]), operand);
//   }

//   return str;
// };

// const loop = input => {
//   input.split("\n").forEach(command => {
//     const commandSplit = command.split("->");
//     let commandInfo = {
//       command: replaceOperand(
//         commandSplit[0].trim(),
//         command.match(/\b[A-Z]+\b/g)
//       ),
//       destination: commandSplit[1].trim()
//     };
// console.log(commandInfo);

// if (commandInfo.command.match(/\b[0-9]+\b/g)) {
//   commandInfo.value = parseInt(command.match(/\b[0-9]+\b/g), 10);
// } else {
//   switch (commandInfo.operator[0]) {
//     case "AND":
//       commandInfo.value =
//         circuit[commandInfo.commandSplit[0]] &
//         circuit[commandInfo.commandSplit[2]];
//       break;
//     case "OR":
//       commandInfo.value =
//         circuit[commandInfo.commandSplit[0]] |
//         circuit[commandInfo.commandSplit[2]];
//       break;
//     case "RSHIFT":
//       commandInfo.value =
//         circuit[commandInfo.commandSplit[0]] >>>
//         commandInfo.commandSplit[2];
//       break;
//     case "LSHIFT":
//       commandInfo.value =
//         circuit[commandInfo.commandSplit[0]] << commandInfo.commandSplit[2];
//       break;
//     case "NOT":
//       commandInfo.value = ~(circuit[commandInfo.commandSplit[1]] >>> 0);
//       break;
//   }
// }

//     if (!circuit.hasOwnProperty(commandInfo.destination)) {
//       const hasBitwiseOperator =
//         commandInfo.command.includes(">>") ||
//         commandInfo.command.includes("<<") ||
//         commandInfo.command.includes("|") ||
//         commandInfo.command.includes("&") ||
//         commandInfo.command.includes("~");
//       const nonBitwiseValue = commandInfo.command.match(/\b[0-9]+\b/g);
//       if (!hasBitwiseOperator && nonBitwiseValue) {
//         commandInfo.value = Number(nonBitwiseValue[0]);
//       }
//       circuit[commandInfo.destination] = commandInfo.value || null;
//     }

//     if (circuit[commandInfo.destination] === null) {
//       const wiresToCheck = commandInfo.command.match(/[a-z]/g);
//       wiresToCheck.forEach(wire => {
//         if (circuit[wire] === null) {
//           return;
//         }
//         const wireValue = circuit[wire];
//         commandInfo.command = commandInfo.command.replace(wire, wireValue);
//       });
//       if (!commandInfo.command.match(/[a-z]/g)) {
//         circuit[commandInfo.destination] = eval(commandInfo.command);
//       }
//     }
//   });
// };

// loop(testInput);
// console.log(circuit);
// console.log("Wire 'A' has a value of:", circuit.a);
