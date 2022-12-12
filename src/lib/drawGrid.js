export const drawGrid = (grid, width) => {
  const gridLines = [];
  let line = [];
  Object.values(grid).forEach((coord, index) => {
    if (index % width === 0) {
      gridLines.push(line);
      line = [];
      line.push(coord);
    } else {
      line.push(coord);
    }
  });
  gridLines.push(line);

  // console.clear();
  gridLines.forEach((line) => {
    console.log(line.join(""));
  });
};
