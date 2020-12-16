import path from 'path'
import fs from 'fs'
import assert from 'assert'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const to36 = (val: string | number): string => {
  const sign = Number(val) < 0 ? '-' : ''
  let init = Math.abs(Number(val)).toString(2)
  while (init.length < 36) {
    init = '0' + init
  }
  return `${sign}${init}`
}

const partOne = () => {
  let mask: string
  const memory = {}
  input.forEach(instruction => {
    const [type, value] = instruction.split('=').map(s => s.trim())
    if (type === 'mask') {
      mask = value
    } else {
      const address = Number(type.match(/\d+/g)[0])
      assert(address)

      let splitVal = to36(value).split('')
      mask.split('').forEach((char, index) => {
        if (char === '0') {
          splitVal[index] = '0'
        } else if (char === '1') {
          splitVal[index] = '1'
        }
      })
      memory[address] = parseInt(
        splitVal.slice(splitVal.indexOf('1')).join(''),
        2
      )
    }
  })
  return Object.values(memory).reduce((a, b) => a + b, 0)
}

const partTwo = () => {
  let mask: string
  const memory = {}

  input.forEach(instruction => {
    const [type, value] = instruction.split('=').map(s => s.trim())
    if (type === 'mask') {
      mask = value
    } else {
      const address = Number(type.match(/\d+/g)[0])
      const splitAddress = to36(address).split('')

      mask.split('').forEach((char, index) => {
        if (char === '1') {
          splitAddress[index] = '1'
        } else if (char === 'X') {
          splitAddress[index] = 'X'
        }
      })

      let numFloating = splitAddress.filter(char => char === 'X').length
      let permutations = Math.pow(2, numFloating)

      const variations = {}
      while (Object.values(variations).length < permutations) {
        const attempt = splitAddress
          .map(char => {
            if (char === 'X') {
              return ['0', '1'][Math.round(Math.random())]
            }
            return char
          })
          .join('')
        if (!variations.hasOwnProperty(attempt)) {
          variations[attempt] = attempt
        }
      }

      const indexes = Object.values(variations)
        .map(v => {
          const vSplit = v.split('')
          const parsed = parseInt(vSplit.slice(v.indexOf('1')).join(''), 2)
          return parsed
        })
        .sort()

      indexes.forEach(index => {
        memory[Number(index)] = Number(value)
      })
    }
  })
  return Object.values(memory)
    .filter(num => num !== undefined)
    .reduce((a, b) => a + b, 0)
}

console.log('--- Day 14: Docking Data ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
