const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const getNode = arr => {
  const [childNodeCount, metadataCount] = arr
    .split(" ")
    .slice(0, 2)
    .map(Number);
  return {
    header: { childNodeCount, metadataCount },
    childNodes: [],
    metadata: []
  };
};

const testInput = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2";
function partOne(input) {
  let step = 0;
  const tree = {};
  tree["A"] = getNode(input);
  console.log(tree);

  return tree;
}

partOne(testInput);

module.exports = {
  partOne
};
