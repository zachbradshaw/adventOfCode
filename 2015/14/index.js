const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const createFlyingGuide = input => {
  let guide = {};
  input.split("\n").forEach(reindeerInfo => {
    const [name, kmPerSecond, flyingTime, restingTime] = reindeerInfo
      .replace(
        /can fly|km\/s|for|seconds, but then must rest for|seconds\./g,
        ""
      )
      .split(" ")
      .filter(i => i !== "");
    guide[name] = {
      name: name,
      defaults: {
        flyingTime: Number(flyingTime),
        restingTime: Number(restingTime),
        kmPerSecond: Number(kmPerSecond)
      },
      flyingTime: Number(flyingTime),
      restingTime: Number(restingTime),
      distanceTraveled: 0,
      points: 0
    };
  });
  return guide;
};

const calculateDistanceTraveled = time => {
  const flyingGuide = createFlyingGuide(input);
  const reindeerList = Object.keys(flyingGuide);

  for (let i = 0; i < time; i++) {
    reindeerList.forEach(reindeer => {
      let { flyingTime, restingTime, defaults } = flyingGuide[reindeer];

      if (flyingTime > 0) {
        flyingGuide[reindeer].distanceTraveled += defaults.kmPerSecond;
        flyingGuide[reindeer].flyingTime += -1;
      }

      if (flyingTime === 0 && restingTime > 0) {
        flyingGuide[reindeer].restingTime += -1;
      }

      if (flyingTime === 0 && restingTime === 0) {
        flyingGuide[reindeer].distanceTraveled += defaults.kmPerSecond;
        flyingGuide[reindeer].flyingTime = defaults.flyingTime - 1;
        flyingGuide[reindeer].restingTime = defaults.restingTime;
      }
    });
  }
  return flyingGuide;
};

const calculatePoints = time => {
  const flyingGuide = createFlyingGuide(input);
  const reindeerList = Object.keys(flyingGuide);

  for (let i = 0; i < time; i++) {
    reindeerList.forEach(reindeer => {
      let { flyingTime, restingTime, defaults } = flyingGuide[reindeer];

      if (flyingTime > 0) {
        flyingGuide[reindeer].distanceTraveled += defaults.kmPerSecond;
        flyingGuide[reindeer].flyingTime += -1;
      }

      if (flyingTime === 0 && restingTime > 0) {
        flyingGuide[reindeer].restingTime += -1;
      }

      if (flyingTime === 0 && restingTime === 0) {
        flyingGuide[reindeer].distanceTraveled += defaults.kmPerSecond;
        flyingGuide[reindeer].flyingTime = defaults.flyingTime - 1;
        flyingGuide[reindeer].restingTime = defaults.restingTime;
      }
    });

    const distanceLeaderboard = Object.values(flyingGuide).sort(
      (a, b) => b.distanceTraveled - a.distanceTraveled
    );
    flyingGuide[distanceLeaderboard[0].name].points += 1;

    let count = 1;
    while (
      distanceLeaderboard[0].distanceTraveled ===
      distanceLeaderboard[count].distanceTraveled
    ) {
      flyingGuide[distanceLeaderboard[count].name].points += 1;
      count++;
    }
  }
  return flyingGuide;
};

const partOne = () => {
  const guideWithDistanceTraveled = calculateDistanceTraveled(2503);

  const winningDistance = Object.values(guideWithDistanceTraveled).reduce(
    (prev, curr) =>
      prev > curr.distanceTraveled ? prev : curr.distanceTraveled,
    0
  );

  console.log("Part one:", winningDistance);
};

const partTwo = () => {
  const guideWithPoints = calculatePoints(2503);
  const highestScore = Object.values(guideWithPoints).reduce(
    (prev, curr) => (prev > curr.points ? prev : curr.points),
    0
  );
  console.log("Part two:", highestScore);
};

console.time("Completed in");
partOne();
partTwo();
console.timeEnd("Completed in");
