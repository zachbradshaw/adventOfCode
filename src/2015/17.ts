const file = await Deno.readTextFile(`${Deno.args}`);
const input = file.trim()
  .split("\n")
  .map(Number);
console.log(input);

const partOne = (target) => {
  let valid = 0;
  const combos = {};
  const sum = (options, target, partial) => {
    let sumPartial;
    let currentNum;
    let remainingOptions;

    partial = partial || [];

    sumPartial = partial.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    if (sumPartial === target) {
      valid += 1;

      const partialLength = partial.length;
      if (combos[partialLength]) {
        combos[partialLength] += 1;
      } else {
        combos[partialLength] = 1;
      }
    }

    if (sumPartial > target) {
      return;
    }

    for (let i = 0; i < options.length; i++) {
      currentNum = options[i];
      remainingOptions = options.slice(i + 1);
      sum(remainingOptions, target, partial.concat([currentNum]));
    }
  };

  sum(input, target);
  console.log(valid);
  console.log(combos);
};

partOne(150);
