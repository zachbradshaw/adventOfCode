import path from "path";
import fs from "fs";
import { computer } from "./intcode";

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), "utf8")
  .trim();

const partOne = () =>
  computer({
    program: input,
    valueOverrides: [{ 1: 12 }, { 2: 2 }],
  })[0];

const partTwo = () => {
  let result;
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      result = computer({
        program: input,
        valueOverrides: [{ 1: i }, { 2: j }],
      });
      if (result[0] === 19690720) {
        result = 100 * result[1] + result[2];
        return result;
      }
    }
  }
};
