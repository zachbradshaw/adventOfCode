const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let doubleLetters = 0;
  let tripleLetters = 0;

  input.split("\n").forEach(id => {
    let idChars = {};
    id.split("").forEach(char => {
      if (!idChars.hasOwnProperty(char)) {
        idChars[char] = 1;
      } else {
        idChars[char] = idChars[char] + 1;
      }
    });

    if (Object.keys(idChars).some(key => idChars[key] === 2)) doubleLetters++;
    if (Object.keys(idChars).some(key => idChars[key] === 3)) tripleLetters++;
  });

  return doubleLetters * tripleLetters;
}

function partTwo(input) {
  const arr = input.split("\n");
  let common = "";
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const charsI = [...arr[i]];
      const charsJ = [...arr[j]];

      const diff = charsI.reduce(
        (acc, currentValue, currentIndex) =>
          acc + (currentValue === charsJ[currentIndex] ? 0 : 1),
        0
      );

      if (diff === 1) {
        common = [...arr[i]]
          .filter(char => -1 !== [...arr[j]].indexOf(char))
          .join("");
      }
    }
  }
  return common;
}

partOne(input); // 7688
// partTwo(input); // lsrivmotzbdxpkxnaqmuwcchj

module.exports = {
  partOne,
  partTwo
};
