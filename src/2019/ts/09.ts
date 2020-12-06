import path from 'path'
import fs from 'fs'
import { computer } from './computer/computer'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

const partOne = () => {
  return computer({ program, input: [1] })[0]
}

const partTwo = () => {
  return computer({ program, input: [2] })[0]
}

console.log('--- Day 9: Sensor Boost ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
