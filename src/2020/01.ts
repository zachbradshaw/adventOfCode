import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

const partOne = () => {
  const splitInput = input.split('\n').map(Number)
  for (let i = 0; i < splitInput.length; i++) {
    for (let j = 0; j < splitInput.length; j++) {
      if (splitInput[i] + splitInput[j] === 2020) {
        return splitInput[i] * splitInput[j]
      }
    }
  }
}

const partTwo = () => {
  const splitInput = input.split('\n').map(Number)
  for (let i = 0; i < splitInput.length; i++) {
    for (let j = 0; j < splitInput.length; j++) {
      for (let k = 0; k < splitInput.length; k++) {
        if (splitInput[i] + splitInput[j] + splitInput[k] === 2020) {
          return splitInput[i] * splitInput[j] * splitInput[k]
        }
      }
    }
  }
}
console.log(partOne())
console.log(partTwo())
