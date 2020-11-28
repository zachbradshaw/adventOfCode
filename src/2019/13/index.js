const path = require("path");
const fs = require("fs");
const computer = require("../computer");
const partOneInput = fs
  .readFileSync(path.resolve(__dirname, "./part_one_input.txt"), "utf8")
  .trim();
const partTwoInput = fs
  .readFileSync(path.resolve(__dirname, "./part_two_input.txt"), "utf8")
  .trim();

const drawGameTile = (tileId, x, y) => {
  switch (tileId) {
    case 0:
      return { visual: " ", type: "empty" };
    case 1:
      return { visual: "|", type: "wall" };
    case 2:
      return { visual: "🀰", type: "block" };
    case 3:
      return { visual: "_", type: "paddle" };
    case 4:
      return { visual: "•", type: "ball" };
  }
};

const partOne = (input) => {
  const { codes } = computer([], input, { collectHistory: { enabled: true } });
  const game = [];
  while (codes.length) {
    game.push(codes.splice(0, 3));
  }

  const gameView = [];
  game.forEach((command) => {
    const [x, y, tileId] = command;
    gameView.push({ x, y, tile: drawGameTile(tileId) });
  });
  console.log(
    "Part one:",
    gameView.filter((i) => i.tile.type === "block").length
  );
};

const partTwo = (input) => {
  let score = 0;
  let joystickInput = 0;
  const { codes } = computer([joystickInput], input, {
    collectHistory: { enabled: true },
  });
  const gameState = [];
  while (codes.length) {
    gameState.push(codes.splice(0, 3));
  }
  const points = {};
  let line = [];
  const gameView = gameState
    .map((command) => {
      const [x, y, tileId] = command;
      if (x === -1 && y === 0) {
        score += tileId;
      } else {
        return { x, y, tile: drawGameTile(tileId, x, y) };
      }
    })
    .sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y))
    .filter((point) => point !== undefined);

  gameView.forEach((point) => {
    if (!points.hasOwnProperty(`${point.x},${point.y}`)) {
      points[`${point.x},${point.y}`] = [point];
    } else {
      points[`${point.x},${point.y}`].push(point);
    }
  });
  let multiples = Object.values(points).filter((point) => point.length > 1);
  multiples.forEach((point) => {
    console.log(point);
  });

  //   gameView.forEach(point => {
  //     if (!point) {
  //       return;
  //     }
  //     line.push(point.tile.visual);

  //     if (line.length === 42) {
  //       console.log(line.join(""));
  //       line = [];
  //     }
  //   });

  //   gameView.forEach(line => {
  //     console.log(line);
  //   });

  //   console.log(gameView);
  //   const ball = gameView.filter(piece => piece.tile.type === "ball");
  const paddle = gameView.filter((piece) => piece.tile.type === "paddle");
  //   gameView.forEach(i => console.log(i));
  //   console.log(ball);
  console.log(paddle);

  console.log("Part two:", score);
};

partOne(partOneInput);
partTwo(partTwoInput);
