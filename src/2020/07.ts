import path from 'path'
import fs from 'fs'
import assert from 'assert'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const partOne = () => {
  const bags: { [bagColor: string]: string[] } = input.reduce((prev, bag) => {
    const splitBag = bag.split('bags contain')
    const currentBag = splitBag[0].trim()
    const contents = splitBag[1]
      .split(',')
      .filter(content => content.trim() !== 'no other bags')
      .map(content => {
        if (content.trim() === 'no other bags.') {
          return 'none'
        }
        const splitContent = content.trim().split(' ')
        return `${splitContent[1]} ${splitContent[2]}`
      })

    return {
      ...prev,
      [currentBag]: contents,
    }
  }, {})

  let total: { [bagColor: string]: number } = {}
  const keys = Object.keys(bags)

  const search = (searchTerms: string[]) => {
    let nextSearch: string[] = []
    keys.forEach(key => {
      searchTerms.forEach(term => {
        const match = bags[key].includes(term)
        if (match) {
          if (!total.hasOwnProperty(key)) {
            total[key] = 1
          } else {
            total[key] = total[key] + 1
          }
          nextSearch.push(key)
        }
      })
    })
    if (nextSearch.length) {
      search(nextSearch)
    }
  }

  search(['shiny gold'])
  return Object.keys(total).length
}

const partTwo = () => {
  const bags: {
    [bagColor: string]: { name: string; amount: number }[]
  } = input.reduce((prev, bag) => {
    const splitBag = bag.split('bags contain')
    const currentBag = splitBag[0].trim()
    const contents = splitBag[1]
      .split(',')
      .filter(content => content.trim() !== 'no other bags.')
      .map(content => {
        const splitContent = content.trim().split(' ')

        return {
          name: `${splitContent[1]} ${splitContent[2]}`,
          amount: Number(splitContent[0]),
        }
      })

    return {
      ...prev,
      [currentBag]: contents,
    }
  }, {})

  // start at -1 so we don't count the outermost bag
  let totalBags = -1
  const bagsToCheck: [string, number][] = [['shiny gold', 1]]
  const traverse = (key: string, amount: number) => {
    totalBags += amount
    let currentBag = bags[key]
    currentBag.forEach(childBag => {
      bagsToCheck.push([childBag.name, amount * childBag.amount])
    })
  }

  while (bagsToCheck.length > 0) {
    let next = bagsToCheck.shift()
    assert(next)
    traverse(next[0], next[1])
  }
  return totalBags
}

console.log('--- Day 7: Handy Haversacks ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
