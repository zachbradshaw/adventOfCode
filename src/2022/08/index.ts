const file = await Deno.readTextFile(`./input.txt`);
const input = file.trim().split('\n');

const generateGrid = () => {
  const grid: {
    [coord: string]: { x: number; y: number; height: number; isEdge: boolean };
  } = {};
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      grid[`${x},${y}`] = {
        x,
        y,
        height: Number(input[y].split('')[x]),
        isEdge:
          x === 0 ||
          y === 0 ||
          x === input[0].length - 1 ||
          y === input.length - 1
      };
    }
  }
  return grid;
};

const partOne = (input) => {
  let total = 0;
  const totalScores: number[] = [];

  const grid = generateGrid();

  Object.values(grid).forEach((coord) => {
    const { x, y, height, isEdge } = coord;

    if (isEdge) {
      total += 1;
      return;
    }

    const right: string[] = [];
    const left: string[] = [];
    const down: string[] = [];
    const up: string[] = [];

    const scores: number[] = [0, 0, 0, 0];

    for (let i = x + 1; i < input[0].length; i++) {
      right.push(`${i},${y}`);
      scores[0] += 1;
      if (grid[`${i},${y}`].height >= height) {
        break;
      }
    }

    for (let i = x - 1; i >= 0; i--) {
      left.push(`${i},${y}`);
      scores[1] += 1;
      if (grid[`${i},${y}`].height >= height) {
        break;
      }
    }

    for (let i = y + 1; i < input.length; i++) {
      down.push(`${x},${i}`);
      scores[2] += 1;
      if (grid[`${x},${i}`].height >= height) {
        break;
      }
    }

    for (let i = y - 1; i >= 0; i--) {
      up.push(`${x},${i}`);
      scores[3] += 1;
      if (grid[`${x},${i}`].height >= height) {
        break;
      }
    }

    const toCheck = [right, left, down, up];
    for (let i = 0; i < toCheck.length; i++) {
      if (toCheck[i].every((c) => grid[c].height < height)) {
        total += 1;
        break;
      }
    }

    totalScores.push(scores.reduce((prev, curr) => prev * curr));
  });

  console.log('Part One:', total);
  console.log('Part Two:', totalScores.sort((a, b) => b - a)[0]);
};

partOne(input);
