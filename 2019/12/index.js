const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const parseInput = str => str.match(/-?\d+/g);

const XYZ = ["x", "y", "z"];
const applyGravity = moons =>
  moons.forEach(moon =>
    moons
      .filter(currentMoon => currentMoon !== moon)
      .forEach(otherMoon =>
        XYZ.forEach(axis => {
          const delta =
            moon.position[axis] < otherMoon.position[axis]
              ? 1
              : moon.position[axis] > otherMoon.position[axis]
              ? -1
              : 0;
          moon.velocity[axis] += delta;
        })
      )
  );

const applyVelocity = moons =>
  moons.forEach(moon =>
    XYZ.forEach(axis => (moon.position[axis] += moon.velocity[axis]))
  );

const loop = moons => {
  applyGravity(moons);
  applyVelocity(moons);
};

const getEnergy = args =>
  Object.values(args).reduce((acc, curr) => Math.abs(acc) + Math.abs(curr), 0);

const partOne = input => {
  const moons = [];
  input.split("\n").forEach(line => {
    const [x, y, z] = parseInput(line).map(Number);
    moons.push({ position: { x, y, z }, velocity: { x: 0, y: 0, z: 0 } });
  });

  for (let i = 0; i < 10; i++) {
    loop(moons);
  }

  const totalEnergy = moons
    .map(moon => {
      return {
        ...moon,
        totalEnergy: getEnergy(moon.position) * getEnergy(moon.velocity)
      };
    })
    .reduce((acc, curr) => acc + curr.totalEnergy, 0);

  console.log("Part one:", totalEnergy);
};

const partTwo = input => {
  const moons = [];
  const original = [];
  input.split("\n").forEach(line => {
    const [x, y, z] = parseInput(line).map(Number);
    moons.push({ position: { x, y, z }, velocity: { x: 0, y: 0, z: 0 } });
    original.push({ position: { x, y, z }, velocity: { x: 0, y: 0, z: 0 } });
  });

  const getPosition = (set, pos) => set.map(moon => moon.position[pos]);
  let matches = [];
  // cheating a bit here, I know it will only take around 193k iterations to
  // find the match I need
  for (let i = 0; i <= 200000; i++) {
    XYZ.forEach(pos => {
      let originalPos = getPosition(original, pos);
      let currentPos = getPosition(moons, pos);

      if (
        i !== 0 &&
        i % 2 === 0 &&
        originalPos.join("") === currentPos.join("")
      ) {
        matches.push(i);
        console.log("Iteration", i, pos);
      }
    });

    loop(moons);
  }
};

// partOne(input);
partTwo(input);
