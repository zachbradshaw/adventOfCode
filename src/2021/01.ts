import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')
  .map(Number)

const partOne = () => {
  let timesIncreased = 0
  input.forEach((reading, index, readings) => {
    if (index >= 1 && readings[index - 1] < reading) {
      timesIncreased++
    }
  })
  return timesIncreased
}

const partTwo = () => {
  let timesIncreased = 0
  const windows: Number[] = []

  input.forEach((reading, index, readings) => {
    const sum = reading + readings[index + 1] + readings[index + 2]
    if (!isNaN(sum)) {
      windows.push(sum)
    }
  })

  windows.forEach((sum, index) => {
    if (index !== windows.length - 1) {
      if (windows[index + 1] > sum) {
        timesIncreased++
      }
    }
  })
  return timesIncreased
}

console.log(partOne())
console.log(partTwo())
