import path from 'path'
import fs from 'fs'
import { computer } from './computer/computer'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

enum Directions {
  NORTH = 1,
  SOUTH = 2,
  WEST = 3,
  EAST = 4,
}
const mazeRobot = (prev, result) => {
  console.log('previous move', prev)
  console.log('result', result)
  if (result === 0) {
    if (prev === Directions.EAST) {
      return [1]
    }
    // else if (prev === Directions.NORTH) {
    //   return [4]
    // } else if (prev === Directions.SOUTH) {
    //   return [1]
    // } else {
    //   return
    // }

    return [prev + 1]
  } else if (result === 1) {
    return [prev]
  } else {
    console.log('found oxygen')
  }
}
computer({ program, input: [4], mazeRobot })
