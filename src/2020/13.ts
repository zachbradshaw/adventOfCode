import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const partOne = () => {
  const timeStamp = input[0]
  const ids = input[1].split(',').filter(id => id !== 'x')
  let timeWaiting = 0
  for (let i = timeStamp; i < timeStamp + 100000; i++) {
    const checkIds = ids.filter(id => i % Number(id) === 0)
    if (checkIds.length) {
      return Number(checkIds[0]) * timeWaiting
    }
    timeWaiting++
  }
}
const partTwo = () => {}

console.log('--- Day 13: Shuttle Search ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', 'incomplete')
console.timeEnd('Completed in')
