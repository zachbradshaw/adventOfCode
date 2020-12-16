const memoryGame = (input, limit) => {
  let turn = 0
  let history = new Map()
  let stack = []
  while (turn < limit) {
    let num
    if (turn < input.length) {
      num = input[turn]
      history.set(num, [turn])
    } else {
      num = stack.pop()
      const indexes = history.get(num)

      // if the last num has only been spoken once, next num is 0
      if (indexes.length === 1) {
        num = 0
        const newIndexes = history.get(num) || []
        newIndexes.push(turn)
        history.set(num, newIndexes)
      } else {
        num = indexes[indexes.length - 1] - indexes[indexes.length - 2]
        const newIndexes = history.get(num) || []
        newIndexes.push(turn)
        history.set(num, newIndexes)
      }
    }
    turn++
    stack.push(num)
  }
  return stack.pop()
}

console.log('--- Day 15: Rambunctious Recitation ---')
console.time('Completed in')
console.log('Part one:', memoryGame([2, 15, 0, 9, 1, 20], 2020))
console.log('Part two:', memoryGame([2, 15, 0, 9, 1, 20], 30000000))
console.timeEnd('Completed in')
