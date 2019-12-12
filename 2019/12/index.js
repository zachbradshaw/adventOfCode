const moons = [
  { position: { x: 1, y: 2, z: -9 }, velocity: { x: 0, y: 0, z: 0 } },
  { position: { x: -1, y: -9, z: -4 }, velocity: { x: 0, y: 0, z: 0 } },
  { position: { x: 17, y: 6, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
  { position: { x: 12, y: 4, z: 2 }, velocity: { x: 0, y: 0, z: 0 } }
];

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

const totalEnergy = moons
  .map(moon => {
    return {
      ...moon,
      totalEnergy: getEnergy(moon.position) * getEnergy(moon.velocity)
    };
  })
  .reduce((acc, curr) => acc + curr.totalEnergy, 0);
