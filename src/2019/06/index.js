const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const testCase =
  "COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN";

const buildMap = input => {
  const splitInput = input.split("\n");
  const orbitMap = {};
  for (let i = 0; i < splitInput.length; i++) {
    const [planet, moon] = splitInput[i].split(")");

    if (!orbitMap.hasOwnProperty(planet)) {
      orbitMap[planet] = {
        name: planet,
        children: [moon]
      };
    } else {
      orbitMap[planet].children = [...orbitMap[planet].children, moon];
    }

    if (!orbitMap.hasOwnProperty(moon)) {
      orbitMap[moon] = {
        name: moon,
        children: []
      };
    }
  }

  const findPlanet = obj => {
    return Object.values(orbitMap).filter(el => {
      return el.children.includes(obj.name);
    })[0];
  };

  Object.values(orbitMap).forEach(node => {
    const parent = findPlanet(node);

    if (parent) {
      node.parent = parent.name;
    } else {
      node.parent = null;
    }
  });
  return orbitMap;
};

const partOne = input => {
  let count = 0;
  const orbitMap = buildMap(input);
  Object.values(orbitMap).forEach(node => {
    const loop = n => {
      if (n.parent) {
        count++;
        loop(orbitMap[n.parent]);
      }
    };
    loop(node);
  });
  console.log("Part one:", count);
};

const partTwo = input => {
  const orbitMap = buildMap(input);
  const start = orbitMap[orbitMap["YOU"].name];
  const end = orbitMap[orbitMap["SAN"].name];

  const startMoves = [];
  [start].forEach(node => {
    const loop = n => {
      if (n.parent) {
        startMoves.push(n.parent);
        loop(orbitMap[n.parent]);
      }
    };
    loop(node);
  });
  const endMoves = [];
  [end].forEach(node => {
    const loop = n => {
      if (n.parent) {
        endMoves.push(n.parent);
        loop(orbitMap[n.parent]);
      }
    };
    loop(node);
  });

  for (let i = 0; i < startMoves.length; i++) {
    if (endMoves.indexOf(startMoves[i]) !== -1) {
      console.log(
        "Part two:",
        startMoves.indexOf(startMoves[i]) + endMoves.indexOf(startMoves[i])
      );
      break;
    }
  }
};

console.time("Completed in");
partOne(input);
partTwo(input);
console.timeEnd("Completed in");
