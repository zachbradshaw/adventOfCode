import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split(',')
  .map(Number)

const partOne = () => {
  const min = input.sort((a, b) => a - b)[0]
  const max = input.sort((a, b) => a - b)[input.length - 1]
  const distances: number[] = []

  for (let i = min; i < max; i++) {
    let distance = 0
    input.forEach((position) => {
      const diff = position > i ? position - i : i - position
      distance += diff
    })
    distances.push(distance)
  }
  return distances.sort((a, b) => a - b)[0]
}

const partTwo = () => {
  const min = input.sort((a, b) => a - b)[0]
  const max = input.sort((a, b) => a - b)[input.length - 1]
  const distances: number[] = []

  for (let i = min; i < max; i++) {
    let distance = 0
    input.forEach((position) => {
      const diff = position > i ? position - i : i - position
      let extra = 0
      for (let j = 0; j < diff; j++) {
        extra += j
      }
      const total = diff + extra
      distance += total
    })
    distances.push(distance)
  }
  return distances.sort((a, b) => a - b)[0]
}

console.log('--- Day 5: Hydrothermal Venture ---')
console.time('Completed in:')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in:')
