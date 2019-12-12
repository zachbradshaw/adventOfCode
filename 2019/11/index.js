// const path = require("path");
// const fs = require("fs");
// const computer = require("../day11computer");
// const data = fs
//   .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
//   .trim();

// let input = 0;
// let grid = [{ coords: "0,0", paintColor: 0, timesPainted: 0 }];
// let robotPosition = { coords: "0,0", direction: "up" };

// const partOne = (initialProgram, input, grid, robotPosition) => {
//   let data = initialProgram;
//   const { codes, state, index, jumpForward } = computer([input], data);

//   const loop = (codes, state, index, jumpForward) => {
//     const [paintColor, direction] = codes;

//     // paint
//     let square = grid.find(point => point.coords === robotPosition.coords);
//     if (square.paintColor !== paintColor) {
//       square.paintColor = paintColor;
//     }
//     square.timesPainted++;

//     // turn
//     const switchDirection = (command, option1, option2) => {
//       return command === 1 ? option1 : option2;
//     };

//     switch (robotPosition.direction) {
//       case "up":
//         robotPosition.direction = switchDirection(direction, "right", "left");
//         break;
//       case "right":
//         robotPosition.direction = switchDirection(direction, "down", "up");
//         break;
//       case "down":
//         robotPosition.direction = switchDirection(direction, "left", "right");
//       case "left":
//         robotPosition.direction = switchDirection(direction, "up", "down");
//     }

//     // move
//     splitCoords = robotPosition.coords.split(",").map(Number);
//     switch (robotPosition.direction) {
//       case "right":
//         splitCoords[0]++;
//         break;
//       case "left":
//         splitCoords[0]--;
//         break;
//       case "up":
//         splitCoords[1]++;
//         break;
//       case "down":
//         splitCoords[1]--;
//         break;
//     }
//     robotPosition.coords = splitCoords.join(",");

//     if (!grid.find(point => point.coords === robotPosition.coords)) {
//       grid.push({
//         coords: robotPosition.coords,
//         paintColor: 0,
//         timesPainted: 0
//       });
//     }

//     const nextPoint = grid.find(point => point.coords === robotPosition.coords);

//     if (nextPoint.paintColor === 1) {
//       input = 1;
//     } else {
//       input = 0;
//     }

//     const {
//       codes: nextCodes,
//       state: nextState,
//       index: nextIndex,
//       jumpForward: nextJumpForward
//     } = computer([input], state, { index, jump: jumpForward });
//     loop(nextCodes, nextState, nextIndex, nextJumpForward);
//   };

//   loop(codes, state, index, jumpForward);
// };

// partOne(data, input, grid, robotPosition);
