import path from 'path'
import fs from 'fs'
import assert from 'assert'
import { computer } from './computer/computer'
import { generateGrid, Grid, GridCoordinate } from './lib/generateGrid'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

const drawRobot = (direction: string): string => {
  let robot = '^'
  switch (direction) {
    case 'up':
      break
    case 'right':
      robot = '>'
      break
    case 'down':
      robot = 'v'
      break
    case 'left':
      robot = '<'
      break
  }
  return robot
}

type DrawGridArgs = {
  robotPosition: { x: number; y: number; direction: string }
  grid: Grid
}
const drawGrid = ({ grid, robotPosition }: DrawGridArgs) => {
  let lines: string[] = []
  let line: string = ''

  grid.forEach((point, index) => {
    const isRobotOnPoint =
      robotPosition.x === point.x && robotPosition.y === point.y

    line += isRobotOnPoint
      ? drawRobot(robotPosition.direction)
      : point.paintColor && point.paintColor === 1
      ? '#'
      : ' '

    if (index === grid.length - 1 || point.x > grid[index + 1].x) {
      lines.push(line)
      line = ''
    }
  })

  lines.forEach(line => {
    console.log(line)
  })
}

const paintRobot = (paintColor: number, direction: number) => {
  const getPoint = (position: GridCoordinate) =>
    grid.find(point => point.x === position.x && point.y === position.y)

  const currentPosition = getPoint(robotPosition)
  assert(currentPosition)

  if (currentPosition?.paintColor !== paintColor) {
    currentPosition.paintColor = paintColor
    currentPosition.painted = true
  }

  const switchDirection = (
    command: number,
    option1: string,
    option2: string
  ) => {
    return command === 1 ? option1 : option2
  }

  switch (robotPosition.direction) {
    case 'up':
      robotPosition.direction = switchDirection(direction, 'right', 'left')
      break
    case 'right':
      robotPosition.direction = switchDirection(direction, 'down', 'up')
      break
    case 'down':
      robotPosition.direction = switchDirection(direction, 'left', 'right')
      break
    case 'left':
      robotPosition.direction = switchDirection(direction, 'up', 'down')
      break
  }

  switch (robotPosition.direction) {
    case 'right':
      robotPosition.x += 1
      break
    case 'left':
      robotPosition.x -= 1
      break
    case 'up':
      robotPosition.y -= 1
      break
    case 'down':
      robotPosition.y += 1
      break
  }
  return getPoint(robotPosition)?.paintColor || 0
}

// Part 1
let grid = generateGrid({
  width: 98,
  height: 65,
  paintColor: 0,
  painted: false,
})

let robotPosition: { x: number; y: number; direction: string } = {
  x: 55,
  y: 25,
  direction: 'up',
}
computer({ program, input: [0], paintRobot })

console.log('--- Day 11: Space Police ---')
console.time('Completed in')
console.log('Part one:', grid.filter(point => point.painted).length)
// drawGrid({ grid, robotPosition })

// Part two
grid = generateGrid({ width: 45, height: 6, paintColor: 0, painted: false })
robotPosition = { x: 0, y: 0, direction: 'up' }
computer({ program, input: [1], paintRobot })
console.log('Part two:')
drawGrid({ grid, robotPosition })
console.timeEnd('Completed in')
