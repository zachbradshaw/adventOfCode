const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

function partOne(input) {
  let guide = {};
  input.split("\n").forEach(line => {
    const [person, direction, amount, neighbor] = line
      .replace(/would|happiness units by sitting next to/g, "")
      .split(" ")
      .filter(i => i !== "");
    // guide = {
    //   ...guide,
    //   [person]: {
    //     ...guide[person],
    //     [neighbor]: direction === "gain" ? amount : `-${amount}`
    //   }
    // };
    if (!guide.hasOwnProperty(person)) {
      guide[person] = {
        [neighbor]: direction === "gain" ? amount : `-${amount}`
      };
    } else {
      guide[person] = {
        ...guide[person],
        [neighbor]: direction === "gain" ? amount : `-${amount}`
      };
    }
    // console.log(person, direction, amount, neighbor);
  });
  console.log(guide);
}

partOne(input);

module.exports = {
  partOne
};
