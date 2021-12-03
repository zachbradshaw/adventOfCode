import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')
  .map((code) => code.split('').map(Number))

const partOne = () => {
  let gamma = Array(input[0].length).fill(0)
  let epsilon = Array(input[0].length).fill(0)

  for (let i = 0; i < input[0].length; i++) {
    let zeroBitCount = 0
    let oneBitCount = 0
    input.forEach((code) => {
      if (code[i] === 0) {
        zeroBitCount++
      } else {
        oneBitCount++
      }
    })
    gamma[i] = zeroBitCount > oneBitCount ? 0 : 1
    epsilon[i] = zeroBitCount > oneBitCount ? 1 : 0
  }

  return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2)
}

const partTwo = () => {
  const getCode = (type: string, input: number[][]) => {
    let codes = input
    for (let i = 0; i <= input[0].length; i++) {
      if (codes.length === 1) {
        break
      }
      let zeroBitCount = 0
      let oneBitCount = 0
      codes.forEach((code) => {
        if (code[i] === 0) {
          zeroBitCount++
        } else {
          oneBitCount++
        }
      })

      if (type === 'oxy') {
        if (oneBitCount > zeroBitCount || oneBitCount === zeroBitCount) {
          codes = codes.filter((c) => c[i] === 1)
        } else {
          codes = codes.filter((c) => c[i] === 0)
        }
      } else {
        if (oneBitCount < zeroBitCount && oneBitCount > 0) {
          codes = codes.filter((c) => c[i] === 1)
        } else {
          codes = codes.filter((c) => c[i] === 0)
        }
      }
    }

    while (codes.length > 1) {
      getCode(type, codes)
    }

    return codes[0].join('')
  }

  const oxy = getCode('oxy', input)
  const co2 = getCode('co2', input)

  return parseInt(oxy, 2) * parseInt(co2, 2)
}
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
