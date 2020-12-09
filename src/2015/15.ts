import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const partOne = () => {
  const amounts = [44, 56]
  const results = []
  const ingredients = input
    .map(ingredient => {
      const [name, properties] = ingredient.split(':')
      return properties.split(',').reduce((prev, curr) => {
        const [property, amount] = curr.trim().split(' ')
        return {
          ...prev,
          [property]: Number(amount),
        }
      }, {})
    })
    .map((ingredient, index) => {
      const { capacity, durability, flavor, texture } = ingredient
      const amount = amounts[index]
      return [
        capacity * amount,
        durability * amount,
        flavor * amount,
        texture * amount,
      ]
    })

  const totals = [0, 0, 0, 0]
  ingredients.forEach(ingredient => {
    ingredient.forEach((amount, index) => {
      totals[index] = totals[index] + Number(amount)
    })
  })
  console.log(totals.reduce((prev, curr) => prev * curr))
}
const partTwo = () => {}
partOne()
