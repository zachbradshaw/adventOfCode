const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();
const permutations = require("../../lib/permutations");

const createSeatingGuide = (input, addMe = false) => {
  let guide = {};
  input.split("\n").forEach(line => {
    const [person, direction, amount, neighbor] = line
      .replace(/would|happiness units by sitting next to|\./g, "")
      .split(" ")
      .filter(i => i !== "");
    if (!guide.hasOwnProperty(person)) {
      guide[person] = {
        [neighbor]: direction === "gain" ? Number(amount) : Number(`-${amount}`)
      };
    } else {
      guide[person] = {
        ...guide[person],
        [neighbor]: direction === "gain" ? Number(amount) : Number(`-${amount}`)
      };
    }
  });

  if (addMe) {
    Object.entries(guide).forEach(entry => {
      entry[1]["Zach"] = 0;
    });
    Object.keys(guide).forEach(key => {
      guide["Zach"] = { ...guide["Zach"], [key]: 0 };
    });
  }
  return guide;
};

const calculateHappinessChange = (guide, arrangement) => {
  let happinessChange = 0;
  arrangement.forEach((name, i, arr) => {
    if (i === 0) {
      happinessChange +=
        guide[name][arr[arr.length - 1]] + guide[name][arr[i + 1]];
    } else if (i === arr.length - 1) {
      happinessChange += guide[name][arr[i - 1]] + guide[name][arr[0]];
    } else {
      happinessChange += guide[name][arr[i - 1]] + guide[name][arr[i + 1]];
    }
  });
  return happinessChange;
};

const findOptimalHappinessChange = (addMe = false) => {
  const seatingGuide = createSeatingGuide(input, addMe);
  const allPossibleArrangements = permutations(Object.keys(seatingGuide));
  let happinessChangeTotals = [];
  allPossibleArrangements.forEach(arrangement => {
    const happinessChange = calculateHappinessChange(seatingGuide, arrangement);
    happinessChangeTotals.push(happinessChange);
  });
  return happinessChangeTotals.sort((a, b) => b - a)[0];
};

function partOne() {
  console.log("Part one:", findOptimalHappinessChange());
}

function partTwo() {
  console.log("Part two:", findOptimalHappinessChange(true));
}

partOne();
partTwo();

module.exports = {
  partOne
};
