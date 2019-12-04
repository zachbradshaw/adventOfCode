const input = "123257-647015";

const partOneValidator = password => {
  let doubles = false;
  const splitPassword = password.split("");
  for (let i = 0; i < password.length; i++) {
    if (i !== password.length - 1) {
      if (splitPassword[i] === splitPassword[i + 1]) {
        doubles = true;
      }

      if (splitPassword[i] > splitPassword[i + 1]) {
        return false;
      }
    }
  }

  return doubles;
};

const partTwoValidator = password => {
  let matchCount = {};
  const splitPassword = password.split("");
  for (let i = 0; i < password.length; i++) {
    if (i !== password.length - 1) {
      if (splitPassword[i] === splitPassword[i + 1]) {
        let count = 1;
        while (splitPassword[i] === splitPassword[i + count]) {
          count++;
        }
        if (!matchCount.hasOwnProperty(splitPassword[i])) {
          matchCount[splitPassword[i]] = count;
        }
      }
      if (splitPassword[i] > splitPassword[i + 1]) {
        return false;
      }
    }
  }

  const values = Object.values(matchCount);
  return !values.length || (values.length <= 2 && !values.includes(2))
    ? false
    : true;
};

const countValidPasswords = validatorFn => {
  const [rangeStart, rangeEnd] = input.split("-");
  const validPasswords = [];
  for (let i = Number(rangeStart); i < Number(rangeEnd); i++) {
    if (validatorFn(i.toString())) {
      validPasswords.push(i);
    }
  }
  return validPasswords.length;
};

const partOne = () => {
  console.log("Part one:", countValidPasswords(partOneValidator));
};

const partTwo = () => {
  console.log("Part two:", countValidPasswords(partTwoValidator));
};

partOne(input);
partTwo(input);
