import path from 'path'
import fs from 'fs'
import { computer } from './computer/computer'
import { createPermutations } from './lib/createPermutations'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

const partOne = () => {
  const results: number[] = []
  const sequences = createPermutations([0, 1, 2, 3, 4])
  sequences.forEach(sequence => {
    let result: number
    sequence.forEach((setting, index) => {
      if (index === 0) {
        result = computer({ input: [setting, 0], program })
      } else {
        result = computer({ input: [setting, result], program })
      }
      results.push(result)
    })
  })
  return results.map(Number).sort((a, b) => b - a)[0]
}

type EarlyReturnResult = {
  code: number
  memory: string
  jumpForward: number
  exitIndex: number
}
const partTwo = () => {
  const sequences = createPermutations([5, 6, 7, 8, 9])
  const results: number[] = []

  sequences.forEach(sequence => {
    let result: EarlyReturnResult
    let amps: EarlyReturnResult[] = []

    for (let i = 0; i < sequence.length; i++) {
      if (i === 0) {
        result = computer({
          input: [sequence[i], 0],
          program,
          returnEarly: true,
        })
        amps.push(result)
      } else {
        result = computer({
          input: [sequence[i], result.code],
          program,
          returnEarly: true,
        })
        amps.push(result)
      }
    }

    const loop = (amps: EarlyReturnResult[]) => {
      for (let i = 0; i < amps.length; i++) {
        if (!amps[i].code) {
          break
        }
        let previousAmpResult
        if (i === 0) {
          previousAmpResult = amps[amps.length - 1].code
        } else {
          previousAmpResult = amps[i - 1].code
        }
        let result = computer({
          input: [previousAmpResult],
          program: amps[i].memory,
          startingIndex: amps[i].exitIndex,
          startingJumpForward: amps[i].jumpForward,
          returnEarly: true,
        })
        if (!result) {
          break
        }
        results.push(result.code)
        amps[i] = result
        if (i === amps.length - 1) {
          loop(amps)
        }
      }
    }

    loop(amps)
  })
  return results.sort((a, b) => b - a)[0]
}

console.log('--- Day 7: Amplification Circuit ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
