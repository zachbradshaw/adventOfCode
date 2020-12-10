import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')
  .map(Number)

const partOne = (): number => {
  let preamble = 25
  let preambleSlice = input.slice(0, preamble)
  let sliceToInspect = input.slice(preamble)
  let badNum = 0

  for (let i = 0; i < sliceToInspect.length; i++) {
    let num = sliceToInspect[i]
    let match = false
    for (let j = 0; j < preambleSlice.length; j++) {
      let diff = num - preambleSlice[j]

      if (preambleSlice.includes(diff)) {
        match = true
        break
      }
    }
    if (match) {
      preambleSlice.push(num)
      preambleSlice.shift()
    } else {
      badNum = num
      break
    }
  }
  return badNum
}

const partTwo = (target: number): number => {
  let total = 0
  for (let i = 0; i < input.length; i++) {
    let num = input[i]
    let sum = num
    let range = [num]
    let lookahead = 1
    while (sum < target) {
      sum = sum + input[i + lookahead]
      range.push(input[i + lookahead])
      if (sum > target) {
        break
      } else if (sum === target) {
        total = range.sort((a, b) => a - b)[0] + range.sort((a, b) => b - a)[0]
        break
      }
      lookahead++
    }
  }
  return total
}

console.log('--- Day 9: Encoding Error ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo(partOne()))
console.timeEnd('Completed in')
