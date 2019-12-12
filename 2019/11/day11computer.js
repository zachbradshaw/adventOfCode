const path = require("path");
const fs = require("fs");
const generateGrid = require("../../lib/generateGrid");
const data = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const parseOpcode = code => {
  if (code.toString().length > 1) {
    return Number(code.toString().slice(-2));
  }
  return code;
};

const getParameterModes = code => {
  if (code.toString().length > 1) {
    const modes = code
      .toString()
      .slice(0, -2)
      .split("")
      .reverse()
      .map(Number);
    while (modes.length < 3) {
      modes.push(0);
    }
    return modes;
  }
  return 0;
};

const getJumpForward = code => {
  switch (code) {
    case 3:
    case 4:
    case 9:
      return 2;
    case 5:
    case 6:
      return 3;
    default:
      return 4;
  }
};

const computer = (
  input,
  data,
  config = {
    index: null,
    jump: null
  }
) => {
  const splitData = data.split(",").map(Number);
  const { jump, index } = config;
  let jumpForward = jump ? jump : getJumpForward(parseOpcode(splitData[0]));
  let relativeBase = 0;
  let returnCode;
  let codeHistory = [];
  for (
    let i = index ? index + jumpForward : 0;
    i < splitData.length;
    i += jumpForward
  ) {
    if (i !== 0 && i !== splitData.length - 1) {
      jumpForward = getJumpForward(parseOpcode(splitData[i]));
    }

    let section = splitData.slice(i, i + jumpForward);
    let param1, param2, destParam;
    let parameterMode = null;
    const rawOpcode = section[0];
    const parsedOpcode = parseOpcode(section[0]);

    switch (parsedOpcode) {
      case 1:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }

        param1 = section[1];
        param2 = section[2];
        destParam = section[3];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              param1 = splitData[param1] || 0;
              break;
            case 1:
              break;
            case 2:
              param1 = splitData[param1 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[1]) {
            case 0:
              param2 = splitData[param2] || 0;
              break;
            case 1:
              break;
            case 2:
              param2 = splitData[param2 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[2]) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              destParam += relativeBase;
              break;
          }
          splitData[destParam] = param1 + param2;
        } else {
          splitData[destParam] =
            splitData[param1] || 0 + splitData[param2] || 0;
        }
        break;
      case 2:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        param1 = section[1];
        param2 = section[2];
        destParam = section[3];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              param1 = splitData[param1] || 0;
              break;
            case 1:
              break;
            case 2:
              param1 = splitData[param1 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[1]) {
            case 0:
              param2 = splitData[param2] || 0;
              break;
            case 1:
              break;
            case 2:
              param2 = splitData[param2 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[2]) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              destParam += relativeBase;
              break;
          }
          splitData[destParam] = param1 * param2;
        } else {
          splitData[destParam] =
            splitData[param1] || 0 * splitData[param2] || 0;
        }
        break;
      case 3:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        destParam = section[1];
        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              destParam += relativeBase;
              break;
          }
        }
        splitData[destParam] = input.shift();
        break;
      case 4:
        let code;
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        destParam = section[1];
        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              code = splitData[destParam] || 0;
              break;
            case 1:
              code = destParam;
              break;
            case 2:
              code = splitData[destParam + relativeBase] || 0;
              break;
          }
        } else {
          code = splitData[destParam];
        }
        codeHistory.push(code);

        // returnCode = {
        //   code,
        //   data: splitData.join(","),
        //   index: i,
        //   jumpForward,
        //   lastInstruction: section,
        //   relativeBase
        // };
        if (codeHistory.length === 2) {
          //   return {
          //     codes: codeHistory,
          //     state: splitData.join(","),
          //     index: i,
          //     jumpForward
          //   };
          input = [paintRobot(codeHistory[0], codeHistory[1])];
          codeHistory = [];
        }
        break;

      case 5:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        param1 = section[1];
        param2 = section[2];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              param1 = splitData[param1] || 0;
              break;
            case 1:
              break;
            case 2:
              param1 = splitData[param1 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[1]) {
            case 0:
              param2 = splitData[param2] || 0;
              break;
            case 1:
              break;
            case 2:
              param2 = splitData[param2 + relativeBase] || 0;
              break;
          }

          if (param1 !== 0) {
            i = param2 - jumpForward;
          }
        } else {
          if (splitData[param1] !== 0) {
            i = splitData[param2] - jumpForward;
          }
        }
        break;
      case 6:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        param1 = section[1];
        param2 = section[2];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              param1 = splitData[param1] || 0;
              break;
            case 1:
              break;
            case 2:
              param1 = splitData[param1 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[1]) {
            case 0:
              param2 = splitData[param2] || 0;
              break;
            case 1:
              break;
            case 2:
              param2 = splitData[param2 + relativeBase] || 0;
              break;
          }

          if (param1 === 0) {
            i = param2 - jumpForward;
          }
        } else {
          if (splitData[param1] === 0) {
            i = splitData[param2] - jumpForward;
          }
        }
        break;
      case 7:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }

        param1 = section[1];
        param2 = section[2];
        destParam = section[3];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              param1 = splitData[param1] || 0;
              break;
            case 1:
              break;
            case 2:
              param1 = splitData[param1 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[1]) {
            case 0:
              param2 = splitData[param2] || 0;
              break;
            case 1:
              break;
            case 2:
              param2 = splitData[param2 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[2]) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              destParam += relativeBase;
              break;
          }
          splitData[destParam] = param1 < param2 ? 1 : 0;
        } else {
          splitData[destParam] = splitData[param1] < splitData[param2] ? 1 : 0;
        }
        break;
      case 8:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }

        param1 = section[1];
        param2 = section[2];
        destParam = section[3];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              param1 = splitData[param1] || 0;
              break;
            case 1:
              break;
            case 2:
              param1 = splitData[param1 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[1]) {
            case 0:
              param2 = splitData[param2] || 0;
              break;
            case 1:
              break;
            case 2:
              param2 = splitData[param2 + relativeBase] || 0;
              break;
          }
          switch (parameterMode[2]) {
            case 0:
              break;
            case 1:
              break;
            case 2:
              destParam += relativeBase;
              break;
          }
          splitData[destParam] = param1 === param2 ? 1 : 0;
        } else {
          splitData[destParam] =
            splitData[param1] === splitData[param2] ? 1 : 0;
        }
        break;
      case 9:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }

        param1 = section[1];

        if (parameterMode) {
          switch (parameterMode[0]) {
            case 0:
              relativeBase += splitData[param1] || 0;
            case 1:
              relativeBase += param1;
              break;
            case 2:
              relativeBase += splitData[param1 + relativeBase] || 0;
              break;
          }
        } else {
          relativeBase += splitData[param1] || 0;
        }
        break;
      case 99:
        return { returnCode, codeHistory };
        break;
    }
  }
};

let grid = [{ coords: "0,0", paintColor: 0, timesPainted: 0 }];
let robotPosition = { coords: "0,0", direction: "up" };

const paintRobot = (paintColor, direction) => {
  // paint
  let square = grid.find(point => point.coords === robotPosition.coords);
  if (square.paintColor !== paintColor) {
    square.paintColor = paintColor;
  }
  square.timesPainted++;

  // turn
  const switchDirection = (command, option1, option2) => {
    return command === 1 ? option1 : option2;
  };

  switch (robotPosition.direction) {
    case "up":
      robotPosition.direction = switchDirection(direction, "right", "left");
      break;
    case "right":
      robotPosition.direction = switchDirection(direction, "down", "up");
      break;
    case "down":
      robotPosition.direction = switchDirection(direction, "left", "right");
      break;
    case "left":
      robotPosition.direction = switchDirection(direction, "up", "down");
      break;
  }

  // move
  splitCoords = robotPosition.coords.split(",").map(Number);
  switch (robotPosition.direction) {
    case "right":
      splitCoords[0]++;
      break;
    case "left":
      splitCoords[0]--;
      break;
    case "up":
      splitCoords[1]++;
      break;
    case "down":
      splitCoords[1]--;
      break;
  }
  robotPosition.coords = splitCoords.join(",");

  if (!grid.find(point => point.coords === robotPosition.coords)) {
    grid.push({
      coords: robotPosition.coords,
      paintColor: 0,
      timesPainted: 0
    });
  }

  const nextPoint = grid.find(point => point.coords === robotPosition.coords);

  if (nextPoint.paintColor === 1) {
    input = 1;
  } else {
    input = 0;
  }

  return input;
};

computer([1], data);
console.log(grid.filter(p => p.timesPainted > 0).length);

// console.log(
// grid.sort(
//   (a, b) =>
//     b.coords.split(",").map(Number)[0] - a.coords.split(",").map(Number)[0]
// );
// );
// const printGrid = generateGrid(41, { color: "black" });
// console.log(grid);
// grid.forEach(val => {
//   console.log(val);
// });

let line = [];
grid
  .sort((a, b) => {
    let aSplit = a.coords.split(",").map(Number);
    let bSplit = b.coords.split(",").map(Number);
    if (aSplit[0] === bSplit[0]) {
      return aSplit[1] - bSplit[1];
    }
    return aSplit[0] - bSplit[0];
    // b.coords.split(",").map(Number)[0] - a.coords.split(",").map(Number)[0];
  })
  .slice(3)
  .forEach(point => {
    // console.log(point);
    const coords = point.coords.split(",").map(Number);

    // const test = grid.find(p => p.coords === `${point.x},${point.y}`);
    // if (test) {
    if (point.paintColor === 1) {
      line.push("🀫");
    } else {
      line.push(" ");
    }

    if (coords[1] === 0) {
      console.log(line.join(""));
      line = [];
    }
    // line.push(point.paintColor === 0 ? " " : "");
    // }

    if (line.length === 41) {
      console.log(line.join(""));
      line = [];
    }
  });

// console.log(
//   grid.forEach(point => {
//     if (point.paintColor === 1) {
//       console.log();
//     }
//     console.log(point);
//   })
// );
// console.log(printGrid);

module.exports = computer;
