import path from 'path'
import fs from 'fs'
import { computer } from './computer/computer'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

const partOne = () => {
  return computer({ program, input: [1] }).sort(
    (a: number, b: number) => b - a
  )[0]
}
const partTwo = () => {
  return computer({ program, input: [5] })[0]
}

console.log('--- Day 5: Sunny with a Chance of Asteroids ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
