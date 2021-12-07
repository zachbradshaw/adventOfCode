import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split(',')
  .map(Number)

const countFish = (days: number) => {
  let dayCount = 0
  let fishies: { [key: number]: number } = input.reduce<{
    [key: number]: number
  }>(
    (prev, curr) => {
      return {
        ...prev,
        [curr]: prev[curr] ? prev[curr] + 1 : 1,
      }
    },
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 }
  )

  while (dayCount < days) {
    Object.entries(fishies).forEach(([key, value]: [string, number]) => {
      const keyAsNum = Number(key)
      const previousKey = keyAsNum - 1

      if (keyAsNum === 0 && fishies[keyAsNum] > 0) {
        fishies[8] += fishies[0]
        fishies[6] += fishies[0]
        fishies[0] = 0
      } else {
        fishies[keyAsNum] -= value

        if (fishies.hasOwnProperty(Number(key) - 1)) {
          fishies[previousKey] += value
        }
      }
    })
    dayCount++
  }

  return Object.values(fishies).reduce((curr, prev) => curr + prev, 0)
}

const partOne = () => {
  return countFish(80)
}
const partTwo = () => {
  return countFish(256)
}

console.log('--- Day 6: Lanternfish ---')
console.time('Completed in:')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in:')
