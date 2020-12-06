import path from 'path'
import fs from 'fs'
import { computer } from './computer/computer'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

const partOne = () =>
  computer({
    program,
    valueOverrides: [{ 1: 12 }, { 2: 2 }],
    returnMemory: true,
  })[0]

const partTwo = () => {
  let result
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      result = computer({
        program,
        valueOverrides: [{ 1: i }, { 2: j }],
        returnMemory: true,
      })
      if (result[0] === 19690720) {
        result = 100 * result[1] + result[2]
        return result
      }
    }
  }
}

console.log('--- Day 2: 1202 Program Alarm ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
