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
          ? (coords[`${currentX},${currentY}`] = {
              id: [id],
              sqIn: width * height
            })
          : (coords[`${currentX},${currentY}`] = {
              ...coords[`${currentX},${currentY}`],
              id: [...coords[`${currentX},${currentY}`].id, id]
            });
      }
    }
  });

  const test = {};
  const coordIds = Object.values(coords).filter(coord => coord.id.length === 1);
  coordIds.forEach(coordId => {
    if (!test.hasOwnProperty(coordId.id)) {
      test[coordId.id] = { id: [coordId.id[0]], sqIn: coordId.sqIn };
    } else {
      test[coordId.id] = {
        ...test[coordId.id],
        id: [...test[coordId.id].id, coordId.id[0]]
      };
    }
  });
  console.log(
    Object.values(test).filter(foo => foo.id.length === foo.sqIn)[0].id[0]
  );
  console.log(
    Object.values(coords).filter(count => count.id.length > 1).length
  );
}

partOne(input);
module.exports = {
  partOne
};
