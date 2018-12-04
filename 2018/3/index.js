const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const testInput = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2";
function partOne(input) {
  const claims = input.split("\n").map(claim => {
    const [id, x, y, width, height] = claim.match(/([0-9]+)/g).map(Number);

    return {
      id,
      x,
      y,
      width,
      height
    };
  });
  const coords = {};
  claims.forEach(claim => {
    const { id, x, y, width, height } = claim;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        let currentX = x + i;
        let currentY = y + j;
        !coords.hasOwnProperty(`${currentX},${currentY}`)
          ? (coords[`${currentX},${currentY}`] = { id, value: 1 })
          : (coords[`${currentX},${currentY}`].value =
              coords[`${currentX},${currentY}`].value + 1);
      }
    }
  });
  console.log(coords);
  console.log(Object.values(coords).filter(count => count.value > 1).length);
}

partOne(input);
module.exports = {
  partOne
};
