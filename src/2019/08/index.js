const path = require("path");
const fs = require("fs");
const input = fs
  .readFileSync(path.resolve(__dirname, "./input.txt"), "utf8")
  .trim();

const loop = (splitInput, layers = []) => {
  const layer = [];
  for (let i = 0; i < 150; i++) {
    layer.push(splitInput.shift());
  }
  layers.push(layer);
  while (splitInput.length) {
    loop(splitInput, layers);
  }
  return layers;
};

const partOne = input => {
  const splitInput = input.split("");
  const layers = loop(splitInput);

  let fewestZeroLayer = null;
  let zeroFilter = i => Number(i) === 0;
  layers.forEach(layer => {
    if (!fewestZeroLayer) {
      fewestZeroLayer = layer;
    }
    if (
      layer.filter(zeroFilter).length <=
      fewestZeroLayer.filter(zeroFilter).length
    ) {
      fewestZeroLayer = layer;
    }
  });
  let oneCount = 0;
  let twoCount = 0;
  fewestZeroLayer.forEach(i => {
    if (Number(i) === 1) {
      oneCount++;
    } else if (Number(i) === 2) {
      twoCount++;
    }
  });
  console.log("Part one:", oneCount * twoCount);
};

const partTwo = input => {
  const splitInput = input.split("");
  const layers = loop(splitInput).reverse();

  const aggregatedLayers = {};
  layers.forEach(layer => {
    layer.forEach((val, i) => {
      if (!aggregatedLayers.hasOwnProperty(i)) {
        aggregatedLayers[i] = [val];
      } else {
        aggregatedLayers[i].push(val);
      }
    });
  });

  let finalValues = [];
  Object.values(aggregatedLayers).forEach(layer => {
    let finalVal = null;
    layer.forEach(val => {
      switch (val) {
        case "0":
          finalVal = "0";
          break;
        case "1":
          finalVal = "1";
        case "2":
          break;
      }
    });
    if (finalVal) {
      finalValues.push(finalVal);
    }
  });

  let img = [];
  finalValues.forEach((val, index) => {
    if (Number(val) === 0) {
      img.push(" ");
    } else {
      img.push("🀫");
    }
    if (index !== 0 && (index + 1) % 25 === 0) {
      console.log(img.join(""));
      img = [];
    }
  });
};

partOne(input);
partTwo(input);
