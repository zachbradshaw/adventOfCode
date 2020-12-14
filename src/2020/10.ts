import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')
  .map(Number)

const high = input.sort((a, b) => b - a)[0]
const adapters = [0].concat(input.sort((a, b) => a - b)).concat([high + 3])

const partOne = () => {
  let oneDiff = 0
  let threeDiff = 0
  adapters.forEach((adapter, index, arr) => {
    if (index !== arr.length - 1) {
      let diff = arr[index + 1] - adapter
      if (diff === 1) {
        oneDiff++
      } else {
        threeDiff++
      }
    }
  })
  return oneDiff * threeDiff
}

const partTwo = () => {
  const subSequences = []
  let sequence = []

  // break the array of adapters into groups where the last
  // index of each array is 3 less than the first index of
  // the next array. thank you to the reddit user who gave
  // me the hint to do this
  for (let i = 0; i < adapters.length; i++) {
    sequence.push(adapters[i])
    if (i !== adapters.length - 1) {
      if (adapters[i + 1] - adapters[i] === 3) {
        subSequences.push(sequence)
        sequence = []
      }
    } else {
      subSequences.push(sequence)
    }
  }

  // not pretty, but look at the length of each subsequence to
  // determine how many possible variations of it exist (given
  // that the first and last numbers of the sequence always have
  // to be there) and return number of differences to be multiplied
  // together in the reduce
  //
  // obviously, this worked for the input provided, but it
  // assumes that there will never be sequences longer than 5
  return subSequences
    .map(sub => {
      if (sub.length === 2) {
        return 1
      } else if (sub.length === 3) {
        return 2
      } else if (sub.length === 4) {
        return 4
      } else if (sub.length === 5) {
        return 7
      }
      return sub.length
    })
    .reduce((prev, curr) => prev * curr)
}

console.log('--- Day 10: Adapter Array ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
