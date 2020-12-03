import path from 'path'
import fs from 'fs'
import assert from 'assert'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const partOne = () => {
  let valid = 0
  input.forEach(line => {
    const [rule, password] = line.split(':')

    const range = rule.match(/\d+/g)
    const letter = rule.match(/[a-z]/g)
    assert(range)
    assert(letter)

    let count = 0
    password
      .trim()
      .split('')
      .forEach(char => {
        if (char === letter[0]) {
          count++
        }
      })
    if (count >= Number(range[0]) && count <= Number(range[1])) {
      valid++
    }
  })
  return valid
}

const partTwo = () => {
  let valid = 0
  input.forEach(line => {
    const [rule, password] = line.split(':')
    let positions = rule.match(/\d+/g)
    const letter = rule.match(/[a-z]/g)
    assert(positions)
    assert(letter)

    const splitPass = password.trim().split('')
    if (
      splitPass[Number(positions[0]) - 1] === letter[0] &&
      splitPass[Number(positions[1]) - 1] !== letter[0]
    ) {
      valid++
    }
    if (
      splitPass[Number(positions[1]) - 1] === letter[0] &&
      splitPass[Number(positions[0]) - 1] !== letter[0]
    ) {
      valid++
    }
  })
  return valid
}

console.log('--- Day 2: Password Philosophy ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
