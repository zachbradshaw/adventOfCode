const generateGrid = require("../../lib/generateGrid");
const checkLightCoords = require("./checkLightCoords");

const adjustLights = (input, gridSize, action) => {
  let grid = generateGrid(gridSize);
  input.forEach(command => {
    let power = command.includes("turn on");
    let toggle = command.includes("toggle");
    let [...coords] = command.match(/\d+/g).map(Number);

    grid.forEach(light => {
      if (checkLightCoords(light, coords)) {
        if (toggle) {
          light.power = !light.power;
          light.brightness += 2;
        } else if (power) {
          light.power = true;
          light.brightness += 1;
        } else {
          light.power = false;
          if (light.brightness > 0) {
            light.brightness -= 1;
          }
        }
      }
    });
  });

  return action === "power"
    ? grid.filter(light => light.power === true).length
    : grid.map(light => light.brightness).reduce((acc, val) => acc + val);
};

module.exports = adjustLights;
