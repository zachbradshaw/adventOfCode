const file = await Deno.readTextFile(`./input.txt`);
const input = file.trim().split('\n');

const partOne = (input) => {
  let cycle = 1;
  let x = 1;
  let crtCol = 0;
  let crtRow = 0;
  const vals: number[] = [];
  const grid: string[][] = [[], [], [], [], [], []];
  const drawIndexes = [40, 80, 120, 160, 200, 240];

  input.forEach((command) => {
    const sprite = [x - 1, x, x + 1];
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      vals.push(cycle * x);
    }

    const draw = (sprite, col) => {
      return sprite.includes(col) ? '#' : ' ';
    };

    if (command === 'noop') {
      if (drawIndexes.includes(cycle)) {
        grid[crtRow].push(draw(sprite, crtCol));

        crtCol = 0;
        crtRow += 1;
      } else {
        grid[crtRow].push(draw(sprite, crtCol));
        crtCol += 1;
      }

      cycle += 1;
      return;
    }

    const [_add, val] = command.split(' ');
    for (let i = 0; i < 2; i++) {
      if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
        vals.push(cycle * x);
      }

      if (drawIndexes.includes(cycle)) {
        grid[crtRow].push(draw(sprite, crtCol));

        crtCol = 0;
        crtRow += 1;
      } else {
        grid[crtRow].push(draw(sprite, crtCol));
        crtCol += 1;
      }

      cycle += 1;
    }

    x += Number(val);
  });

  console.log(
    'Part one:',
    vals.reduce((prev, curr) => prev + curr, 0)
  );
  console.log('Part two:');

  grid.forEach((row) => console.log(row.join('')));
};

partOne(input);
