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
  return [0, 0, 0];
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

const updatePositionParam = (mode, positionParam, splitData, relBase) => {
  switch (mode) {
    case 0:
      positionParam = splitData[positionParam] || 0;
      break;
    case 1:
      return positionParam;
    case 2:
      positionParam = splitData[positionParam + relBase] || 0;
      break;
  }
  return positionParam;
};

const updateDestParam = (
  mode,
  destParam,
  relBase,
  output = false,
  splitData = null
) => {
  switch (mode) {
    case 0:
      if (output) {
        return splitData[destParam] || 0;
      }
    case 1:
      return destParam;
    case 2:
      if (output) {
        return splitData[destParam + relBase] || 0;
      } else {
        return (destParam += relBase);
      }
  }
};

const computer = (
  input,
  data,
  config = {
    index: null,
    jump: null,
    collectHistory: { enabled: false, amount: null }
  }
) => {
  const splitData = data.split(",").map(Number);
  let jumpForward = config.jump
    ? config.jump
    : getJumpForward(parseOpcode(splitData[0]));
  let relBase = 0;
  let returnCode;
  let codeHistory = [];
  for (
    let i = config.index ? config.index + jumpForward : 0;
    i < splitData.length;
    i += jumpForward
  ) {
    if (i !== 0 && i !== splitData.length - 1) {
      jumpForward = getJumpForward(parseOpcode(splitData[i]));
    }

    let section = splitData.slice(i, i + jumpForward);

    let param1, param2, destParam;
    let mode = null;
    const rawOpcode = section[0];
    const parsedOpcode = parseOpcode(section[0]);

    switch (parsedOpcode) {
      case 1:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        param2 = updatePositionParam(mode[1], section[2], splitData, relBase);
        destParam = updateDestParam(mode[2], section[3], relBase);

        splitData[destParam] = param1 + param2;
        break;
      case 2:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        param2 = updatePositionParam(mode[1], section[2], splitData, relBase);
        destParam = updateDestParam(mode[2], section[3], relBase);

        splitData[destParam] = param1 * param2;
        break;
      case 3:
        mode = getParameterModes(rawOpcode);
        destParam = updateDestParam(mode[0], section[1], relBase);

        splitData[destParam] = input.shift();
        break;
      case 4:
        mode = getParameterModes(rawOpcode);
        destParam = updateDestParam(
          mode[0],
          section[1],
          relBase,
          true,
          splitData
        );
        if (config.collectHistory && config.collectHistory.enabled) {
          codeHistory.push(destParam);

          if (
            config.collectHistory.amount &&
            codeHistory.length === config.collectHistory.amount
          ) {
            return {
              codes: codeHistory,
              data: splitData.join(","),
              index: i,
              jumpForward,
              lastInstruction: section,
              relBase
            };
          }
        } else {
          if (destParam !== 0) {
            return {
              code: destParam,
              data: splitData.join(","),
              index: i,
              jumpForward,
              lastInstruction: section,
              relBase
            };
          }
        }

        break;
      case 5:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        param2 = updatePositionParam(mode[1], section[2], splitData, relBase);

        if (param1 !== 0) {
          i = param2 - jumpForward;
        }
        break;
      case 6:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        param2 = updatePositionParam(mode[1], section[2], splitData, relBase);

        if (param1 === 0) {
          i = param2 - jumpForward;
        }
        break;
      case 7:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        param2 = updatePositionParam(mode[1], section[2], splitData, relBase);
        destParam = updateDestParam(mode[2], section[3], relBase);

        splitData[destParam] = param1 < param2 ? 1 : 0;
        break;
      case 8:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        param2 = updatePositionParam(mode[1], section[2], splitData, relBase);
        destParam = updateDestParam(mode[2], section[3], relBase);

        splitData[destParam] = param1 === param2 ? 1 : 0;
        break;
      case 9:
        mode = getParameterModes(rawOpcode);
        param1 = updatePositionParam(mode[0], section[1], splitData, relBase);
        relBase += param1;
        break;
      case 99:
        return {
          codes: codeHistory,
          data: splitData.join(","),
          index: i,
          jumpForward,
          lastInstruction: section,
          relBase
        };
    }
  }
};

module.exports = computer;
