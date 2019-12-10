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

const computer = (input, data, index = null, jump = null) => {
  const splitData = data.split(",").map(Number);
  let jumpForward = jump ? jump : getJumpForward(parseOpcode(splitData[0]));
  let relativeBase = 0;
  let returnCode;
  for (
    let i = index ? index + jumpForward : 0;
    i < splitData.length;
    i += jumpForward
  ) {
    if (i !== 0 && i !== splitData.length - 1) {
      jumpForward = getJumpForward(parseOpcode(splitData[i]));
    }

    let section = splitData.slice(i, i + jumpForward);
    console.log(section);

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

        returnCode = {
          code,
          data: splitData.join(","),
          index: i,
          jumpForward,
          lastInstruction: section,
          relativeBase
        };
        console.log({ code, lastInstruction: section });

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
        return returnCode;
        break;
    }
  }
};

module.exports = computer;
