"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const intcode_1 = require("./intcode");
const input = fs_1.default
    .readFileSync(path_1.default.resolve(__dirname, process.argv[2]), "utf8")
    .trim();
const partOne = () => intcode_1.computer({
    program: input,
    valueOverrides: [{ 1: 12 }, { 2: 2 }],
})[0];
const partTwo = () => {
    let result;
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            result = intcode_1.computer({
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
