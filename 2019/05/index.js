const path = require("path");
const fs = require("fs");
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
      return 2;
    case 5:
    case 6:
      return 3;
    default:
      return 4;
  }
};

const computer = input => {
  const splitData = data.split(",").map(Number);
  let jumpForward = getJumpForward(splitData[0]);
  for (let i = 0; i < splitData.length; i += jumpForward) {
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
          param1 = parameterMode[0] === 0 ? splitData[param1] : param1;
          param2 = parameterMode[1] === 0 ? splitData[param2] : param2;
          splitData[destParam] = param1 + param2;
        } else {
          splitData[destParam] = splitData[param1] + splitData[param2];
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
          param1 = parameterMode[0] === 0 ? splitData[param1] : param1;
          param2 = parameterMode[1] === 0 ? splitData[param2] : param2;
          splitData[destParam] = param1 * param2;
        } else {
          splitData[destParam] = splitData[param1] * splitData[param2];
        }
        break;
      case 3:
        destParam = section[1];
        splitData[destParam] = input;
        break;
      case 4:
        let code;
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        destParam = section[1];
        if (parameterMode) {
          code = parameterMode[0] === 0 ? splitData[destParam] : destParam;
        } else {
          code = splitData[destParam];
        }
        if (code !== 0) {
          return code;
        } else {
          console.log("Test passed");
        }
        break;
      case 5:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        param1 = section[1];
        param2 = section[2];

        if (parameterMode) {
          param1 = parameterMode[0] === 0 ? splitData[param1] : param1;
          param2 = parameterMode[1] === 0 ? splitData[param2] : param2;

          if (param1 !== 0) {
            i = param2 - jumpForward;
          }
        } else {
          if (splitData[param1] !== 0) {
            i = splitData[param2] - jumpForward;
          }
          break;
        }
        break;
      case 6:
        if (rawOpcode.toString().length > 1) {
          parameterMode = getParameterModes(rawOpcode);
        }
        param1 = section[1];
        param2 = section[2];

        if (parameterMode) {
          param1 = parameterMode[0] === 0 ? splitData[param1] : param1;
          param2 = parameterMode[1] === 0 ? splitData[param2] : param2;

          if (param1 === 0) {
            i = param2 - jumpForward;
          }
        } else {
          if (splitData[param1] === 0) {
            i = splitData[param2] - jumpForward;
          }
          break;
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
          param1 = parameterMode[0] === 0 ? splitData[param1] : param1;
          param2 = parameterMode[1] === 0 ? splitData[param2] : param2;
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
          param1 = parameterMode[0] === 0 ? splitData[param1] : param1;
          param2 = parameterMode[1] === 0 ? splitData[param2] : param2;
          splitData[destParam] = param1 === param2 ? 1 : 0;
        } else {
          splitData[destParam] =
            splitData[param1] === splitData[param2] ? 1 : 0;
        }
        break;
      case 99:
        break;
    }
  }
};

console.time("Completed in");
console.log(computer(1));
console.log(computer(5));
console.timeEnd("Completed in");
