const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const generateGrid = size => {
  let grid = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      grid.push({ value: null, x: x, y: y });
    }
  }
  return grid;
};

const testInput = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2";
function partOne(input) {
  const claims = input.split("\n").map(claim => {
    const [id, x, y, width, height] = claim.match(/([0-9]+)/g).map(Number);

    return {
      id,
      topLeft: { x, y },
      size: { width, height }
    };
  });

  const grid = generateGrid(8);
  claims.forEach(claim => {
    const { id } = claim;
    const { x, y } = claim.topLeft;
    const { width, height } = claim.size;

    const topLeft = grid.find(inch => inch.x === x && inch.y === y);
    topLeft.value = id;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let claimedInch = grid.find(
          inch => inch.x === x + i && inch.y === y + j
        );

        if (claimedInch.value !== null) {
          claimedInch.value = "X";
        } else {
          claimedInch.value = id;
        }
      }
    }
  });
  let count = 0;
  grid.forEach(inch => {
    if (inch.value === "X") {
      count++;
    }
  });
  console.log(count);
  // console.log(grid);
}

partOne(input);
module.exports = {
  partOne
};
