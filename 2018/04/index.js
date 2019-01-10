const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  const guards = {};
  const sortedInput = input.split("\n").sort((a, b) => {
    const [aYear, aMonth, aDay, aHour, aMinute] = a.match(/[0-9]+/g);
    const [bYear, bMonth, bDay, bHour, bMinute] = b.match(/[0-9]+/g);
    return (
      new Date(aYear, aMonth, aDay, aHour, aMinute) -
      new Date(bYear, bMonth, bDay, bHour, bMinute)
    );
  });
  console.log(sortedInput);
  input.split("\n").forEach(entry => {
    const [year, month, day, hour, minute, guardId] = entry.match(/[0-9]+/g);
    if (guardId) {
      let currentGuardId = guardId;
      if (!guards.hasOwnProperty(guardId)) {
        guards[guardId] = {
          id: guardId,
          minutesOnDuty: 0,
          minutesSlept: 0
        };
      }
    }
  });

  console.log(guards);
}

partOne(input);

module.exports = {
  partOne
};
