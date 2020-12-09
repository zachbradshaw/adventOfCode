import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const buildRange = (size: number): number[] => {
  let range = []
  for (let i = 0; i <= size; i++) {
    range.push(i)
  }
  return range
}

const ids: number[] = []
input.forEach(seat => {
  // how I should have done it
  // const id = parseInt(
  //   seat
  //     .split('')
  //     .map(char => {
  //       if (char === 'B' || char === 'R') {
  //         return 1
  //       }
  //       return 0
  //     })
  //     .join(''),
  //   2
  // )

  // how I actually did it
  let range = buildRange(127)
  let col = buildRange(7)
  seat.split('').forEach(char => {
    if (char === 'F') {
      range = range.slice(0, Math.floor(range.length / 2))
    } else if (char === 'B') {
      range = range.slice(Math.floor(range.length / 2), range.length)
    } else if (char === 'R') {
      col = col.slice(Math.floor(col.length / 2), col.length)
    } else if (char === 'L') {
      col = col.slice(0, Math.floor(col.length / 2))
    }
  })
  const id = range[0] * 8 + col[0]
  ids.push(id)
})

console.log('--- Day 5: Binary Boarding ---')
console.time('Completed in')
console.log('Part one:', ids.sort((a, b) => b - a)[0])
console.log(
  'Part two:',
  ids
    .sort((a, b) => a - b)
    .filter(
      (id, index, arr) => arr[index + 1] && arr[index + 1] !== id + 1
    )[0] + 1
)
console.timeEnd('Completed in')
