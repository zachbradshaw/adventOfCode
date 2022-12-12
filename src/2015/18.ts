import { drawGrid } from "../lib/drawGrid.js";
const file = await Deno.readTextFile(`${Deno.args}`);
const input = file.trim().split("\n");

const grid = {};
for (let y = 0; y < input.length; y++) {
  const row = input[y].split("");
  for (let x = 0; x < row.length; x++) {
    grid[`${x},${y}`] = row[x];
  }
}

const getCoordsToCheck = (x: number, y: number): [number, number][] => {
  return [
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
  ];
};

let steps = 0;
const ON = "#";
const OFF = ".";
const partOne = (grid, stuck) => {
  steps++;

  drawGrid(grid, input[0].length);
  const newGrid = {};
  const coords = Object.keys(grid);
  // const stuckCoords = ['0,0', '']

  coords.forEach((coord) => {
    // console.log(coord);
    const [x, y] = coord.split(",").map(Number);
    const neighbors = getCoordsToCheck(x, y).map(([x, y]) =>
      grid[`${x},${y}`]
    ).filter((val) => val === ON).length;

    if (
      (grid[coord] === ON && (neighbors === 2 || neighbors === 3)) ||
      (grid[coord] === OFF && neighbors === 3)
    ) {
      newGrid[coord] = ON;
    } else {
      newGrid[coord] = OFF;
    }
  });

  if (stuck) {
    const rowLength = input[0].length;
    const numCols = input.length;
    newGrid[`0,0`] = "#";
    newGrid[`${rowLength - 1},0`] = "#";
    newGrid[`0,${numCols - 1}`] = "#";
    newGrid[`${rowLength - 1},${numCols - 1}`] = "#";
  }

  if (steps < 100) {
    partOne(newGrid, stuck);
  } else {
    console.log(Object.values(newGrid).filter((light) => light === ON).length);
  }
};

// partOne(grid);
partOne(grid, true);
