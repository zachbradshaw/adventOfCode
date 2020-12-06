import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

input.forEach(line => console.log(line))

const createReactionGuide = reactions => {
  const guide = {}
  reactions.forEach(reaction => {
    const ingredients = {}
    const [input, output] = reaction.split(' => ')
    const splitIngredients = input.split(', ')
    splitIngredients.forEach(ing => {
      const [amount, type] = ing.split(' ')
      ingredients[type] = Number(amount)
    })
    const [resultAmount, resultType] = output.split(' ')

    guide[resultType] = {
      ingredients,
      amountProduced: Number(resultAmount),
    }
    if (ingredients['ORE']) {
      guide[resultType].fromOre = true
    }
  })
  return guide
}
const guide = createReactionGuide(input)
console.log(guide)
