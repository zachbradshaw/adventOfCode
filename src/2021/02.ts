import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')
  .map(command => command.split(' '))

const partOne = () => {
  let position = { x: 0, y: 0 }
  input.forEach(([direction, value]) => {
    switch (direction) {
      case 'forward':
        position.x += Number(value)
        break
      case 'down':
        position.y += Number(value)
        break
      case 'up':
        position.y -= Number(value)
        break
    }
  })

  return position.x * position.y
}

const partTwo = () => {
  let position = { x: 0, y: 0, z: 0 }
  input.forEach(([direction, value]) => {
    switch (direction) {
      case 'forward':
        position.x += Number(value)
        position.y += position.z * Number(value)
        break
      case 'down':
        position.z += Number(value)
        break
      case 'up':
        position.z -= Number(value)
        break
    }
  })

  return position.x * position.y
}

console.log(partOne())
console.log(partTwo())
