import path from 'path'
import fs from 'fs'
import assert from 'assert'

const input: string[] = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const partOne = () => {
  let acc = 0
  let visited: { [index: number]: number } = {}

  for (let i = 0; i < input.length; i++) {
    if (!visited.hasOwnProperty(i)) {
      visited[i] = 1
    } else {
      return acc
    }
    const [op, num] = input[i].split(' ')

    if (op === 'acc') {
      acc += Number(num)
    } else if (op === 'jmp') {
      i += Number(num) - 1
    }
  }
}

const partTwo = () => {
  // find all of the 'jmp' and 'nop' indexes from the original input
  const nopJumpIndexes = input
    .map((instruction, index) => {
      const [op] = instruction.split(' ')
      if (op === 'jmp' || op === 'nop') {
        return index
      }
    })
    .filter(index => index !== undefined)

  let finalAcc = 0

  // loop through 'jmp' and 'nop' commands, switching one for the other in each
  // iteration, until we are able to make it to the end of the instruction set
  nopJumpIndexes.forEach(option => {
    assert(option)
    const input = fs
      .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
      .trim()
      .split('\n')

    const old = input[option].split(' ')
    if (old[0] === 'nop') {
      input[option] = `jmp ${old[1]}`
    } else {
      input[option] = `nop ${old[1]}`
    }

    let visited: { [index: number]: number } = {}
    let acc = 0
    for (let i = 0; i < input.length; i++) {
      if (!visited.hasOwnProperty(i)) {
        visited[i] = 1
      } else {
        // break is necessary since if we get into this else block, the current
        // program is in an infinite loop
        break
      }
      const [op, num] = input[i].split(' ')

      if (op === 'acc') {
        acc += Number(num)
      } else if (op === 'jmp') {
        i += Number(num) - 1
      }

      // if we made it to the end of the instruction set, acc is our answer
      if (i === input.length - 1) {
        finalAcc = acc
      }
    }
  })
  return finalAcc
}

console.log('--- Day 8: Handheld Halting ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
