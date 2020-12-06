import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const answers: string[][] = []
let fields: string[] = []
input.forEach((field, index) => {
  if (field !== '') {
    fields.push(field)
    if (index === input.length - 1) {
      answers.push(fields)
    }
  } else {
    answers.push(fields)
    fields = []
  }
})

const partOne = () => {
  const result: Set<string>[] = []
  answers.forEach(group => {
    let groupAnswers: Set<string> = new Set()
    group.forEach(person => {
      person.split('').forEach(question => {
        groupAnswers.add(question)
      })
    })
    result.push(groupAnswers)
  })
  return result.reduce((prev, curr) => prev + curr.size, 0)
}

const partTwo = () => {
  let total = 0
  answers.forEach(group => {
    let groupKey: { [char: string]: number } = {}
    group.forEach(person => {
      person.split('').forEach(char => {
        if (!groupKey.hasOwnProperty(char)) {
          groupKey[char] = 1
        } else {
          groupKey[char] = groupKey[char] + 1
        }
      })
    })

    let keys = Object.keys(groupKey)
    let vals = Object.values(groupKey)
    keys.forEach((_key, index) => {
      if (vals[index] === group.length) {
        total++
      }
    })
  })
  return total
}

console.log('--- Day 6: Custom Customs ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
