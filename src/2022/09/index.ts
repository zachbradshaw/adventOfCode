const file = await Deno.readTextFile(`./input.txt`);
const input = file.trim().split('\n');

const getCoordsToCheck = (x: number, y: number): [string][] => {
  return [
    `${x + 1},${y - 1}`,
    `${x + 1},${y + 1}`,
    `${x - 1},${y + 1}`,
    `${x - 1},${y - 1}`
  ];
};

const partOne = (input) => {
  let headAt = { x: 0, y: 0 };
  let tailAt = { x: 0, y: 0 };
  const grid = {
    '0,0': { x: 0, y: 0, tail: 0 }
  };

  const updateTail = (headAt) => {
    if (headAt.x === tailAt.x) {
      if (headAt.y > tailAt.y && headAt.y - tailAt.y > 1) {
        tailAt.y += 1;
      } else if (headAt.y < tailAt.y && tailAt.y - headAt.y > 1) {
        tailAt.y -= 1;
      }
    } else if (headAt.y === tailAt.y) {
      if (headAt.x > tailAt.x && headAt.x - tailAt.x > 1) {
        tailAt.x += 1;
      } else if (headAt.x < tailAt.x && tailAt.x - headAt.x > 1) {
        tailAt.x -= 1;
      }
    } else if (
      !getCoordsToCheck(headAt.x, headAt.y).includes(`${tailAt.x},${tailAt.y}`)
    ) {
      if (headAt.x > tailAt.x) {
        if (headAt.y < tailAt.y) {
          tailAt.x += 1;
          tailAt.y -= 1;
        } else {
          tailAt.x += 1;
          tailAt.y += 1;
        }
      } else {
        if (headAt.y < tailAt.y) {
          tailAt.x -= 1;
          tailAt.y -= 1;
        } else {
          tailAt.x -= 1;
          tailAt.y += 1;
        }
      }
    }

    grid[`${tailAt.x},${tailAt.y}`].tail += 1;
  };

  input.forEach((command, index) => {
    const [direction, moves] = command.split(' ');

    if (direction === 'R' || direction === 'L') {
      for (let i = 1; i <= Number(moves); i++) {
        const coord = grid[`${headAt.x},${headAt.y}`];
        const next = direction === 'R' ? coord.x + 1 : coord.x - 1;
        const lookup = `${next},${coord.y}`;
        const point = {
          ...grid[lookup],
          x: next,
          y: coord.y,
          tail: grid[lookup]?.tail ?? 0
        };

        grid[lookup] = point;
        headAt = { x: next, y: coord.y };

        updateTail(headAt);
      }
    } else {
      for (let i = 1; i <= Number(moves); i++) {
        const coord = grid[`${headAt.x},${headAt.y}`];
        const next = direction === 'D' ? coord.y + 1 : coord.y - 1;
        const lookup = `${coord.x},${next}`;
        const point = {
          ...grid[lookup],
          x: coord.x,
          y: next,
          tail: grid[lookup]?.tail ?? 0
        };
        grid[lookup] = point;
        headAt = { x: coord.x, y: next };

        updateTail(headAt);
      }
    }
  });

  console.log(
    'Part one:',
    Object.values(grid).filter((c) => c.tail > 0).length
  );
};

partOne(input);
