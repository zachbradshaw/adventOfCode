const generateGrid = (size, shape = { power: false, brightness: 0 }) => {
  let grid = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      grid.push({ ...shape, x: x, y: y });
    }
  }
  return grid;
};

module.exports = generateGrid;
