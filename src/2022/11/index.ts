const file = await Deno.readTextFile(`./input.txt`);
const input = file.trim().split('\n\n');

type Monkey = {
  id: number;
  items: number[];
  op: any;
  test: number;
  pass: number;
  fail: number;
  itemsInspected: number;
};

const getMonkeys = () => {
  const monkeys: Monkey[] = [];
  input.forEach((monkey) => {
    const [id, startingItems, op, test, pass, fail] = monkey
      .split('\n')
      .map((s, index) => s.trim().split(':')[index === 0 ? 0 : 1].trim());

    monkeys.push({
      id: Number(id.split(' ')[1]),
      items: startingItems.split(',').map(Number),
      op: [
        op.split(' ')[op.split(' ').length - 2],
        Number(op.split(' ')[op.split(' ').length - 1])
      ],
      test: Number(test.split(' ')[test.split(' ').length - 1]),
      pass: Number(pass.split(' ')[pass.split(' ').length - 1]),
      fail: Number(fail.split(' ')[fail.split(' ').length - 1]),
      itemsInspected: 0
    });
  });
  return monkeys;
};

const partOne = (monkeys) => {
  for (let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      const { op, test, pass, fail } = monkey;

      monkey.items = monkey.items
        .map((item) => {
          monkey.itemsInspected += 1;

          let leftSide = item;
          let rightSide = !isNaN(op[1]) ? op[1] : leftSide;
          let result = 0;
          if (op[0] === '+') {
            result = Math.floor((leftSide + rightSide) / 3);
          } else {
            result = Math.floor((leftSide * rightSide) / 3);
          }

          if (result % test === 0) {
            monkeys[pass].items.push(result);
          } else {
            monkeys[fail].items.push(result);
          }
          return undefined;
        })
        .filter((i) => i !== undefined);
    });
  }

  const result = monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
  console.log('Part one:', result[0].itemsInspected * result[1].itemsInspected);
};

const partTwo = (monkeys) => {
  // shame on me
  const gcd = (a, b) => (a ? gcd(b % a, a) : b);
  const getLcm = (a, b) => (a * b) / gcd(a, b);

  const lcm = monkeys.map((m) => m.test).reduce(getLcm);

  for (let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
      const { op, test, pass, fail } = monkey;

      monkey.items = monkey.items
        .map((item) => {
          monkey.itemsInspected += 1;

          let leftSide = item;
          let rightSide = !isNaN(op[1]) ? op[1] : leftSide;
          let result = 0;
          if (op[0] === '+') {
            result = leftSide + rightSide;
          } else {
            result = leftSide * rightSide;
          }

          result = result % lcm;

          if (result % test === 0) {
            monkeys[pass].items.push(result);
          } else {
            monkeys[fail].items.push(result);
          }
          return undefined;
        })
        .filter((i) => i !== undefined);
    });
  }

  const result = monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
  console.log('Part two:', result[0].itemsInspected * result[1].itemsInspected);
};

console.log('--- Day 11: Monkey in the Middle ---');
partOne(getMonkeys());
partTwo(getMonkeys());
