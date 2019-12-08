const createPermutations = options => {
  let permutations = [];
  if (options.length === 1) {
    permutations.push(options);
    return permutations;
  }

  for (let i = 0; i < options.length; i++) {
    let firstOption = options[i];
    let remainingOptions = options.slice(0, i).concat(options.slice(i + 1));
    let innerOptions = createPermutations(remainingOptions);
    for (let j = 0; j < innerOptions.length; j++) {
      permutations.push([firstOption].concat(innerOptions[j]));
    }
  }
  return permutations;
};

module.exports = createPermutations;
