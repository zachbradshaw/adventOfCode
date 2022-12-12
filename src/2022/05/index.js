const path = require('path');
const fs = require('fs');

const input = fs
  .readFileSync(path.resolve(__dirname, './input.txt'), 'utf8')
  .split('\n');

const partOne = (input) => {
  let crates = Array.from(Array(input[0].split('').length), () => []);
  let cratesReady = false;
  input.forEach((line) => {
    if (line.length === 0) {
      cratesReady = true;
      crates = crates.filter((c) => c.length > 0).map((c) => c.reverse());
      return;
    }

    if (!cratesReady) {
      line.split('').forEach((char, i) => {
        if (char.match(/[A-Z]/)) {
          crates[i].push(char);
        }
      });
    } else {
      const [quant, from, to] = line.match(/\d+/g);

      for (let i = 0; i < quant; i++) {
        const toMove = crates[from - 1].pop();
        crates[to - 1].push(toMove);
      }
    }
  });
  return crates
    .reduce((prev, curr) => {
      prev.push(curr[curr.length - 1]);
      return prev;
    }, [])
    .join('');
};

const partTwo = (input) => {
  let crates = Array.from(Array(input[0].split('').length), () => []);
  let cratesReady = false;
  input.forEach((line) => {
    if (line.length === 0) {
      cratesReady = true;
      crates = crates.filter((c) => c.length > 0).map((c) => c.reverse());
      return;
    }

    if (!cratesReady) {
      line.split('').forEach((char, i) => {
        if (char.match(/[A-Z]/)) {
          crates[i].push(char);
        }
      });
    } else {
      const [quant, from, to] = line.match(/\d+/g);

      const toMove = crates[from - 1].splice(
        crates[from - 1].length - quant,
        quant
      );
      crates[to - 1].push(...toMove);
    }
  });
  return crates
    .reduce((prev, curr) => {
      prev.push(curr[curr.length - 1]);
      return prev;
    }, [])
    .join('');
};

console.log('Part one:', partOne(input));
console.log('Part two:', partTwo(input));
