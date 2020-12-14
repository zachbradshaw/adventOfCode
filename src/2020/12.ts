import path from 'path'
import fs from 'fs'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

const changeDirection = (type, value, currentDirection) => {
  switch (type) {
    case 'R':
      if (currentDirection === 'east') {
        switch (value) {
          case 90:
            return 'south'
          case 180:
            return 'west'
          case 270:
            return 'north'
        }
      } else if (currentDirection === 'south') {
        switch (value) {
          case 90:
            return 'west'
          case 180:
            return 'north'
          case 270:
            return 'east'
        }
      } else if (currentDirection === 'west') {
        switch (value) {
          case 90:
            return 'north'
          case 180:
            return 'east'
          case 270:
            return 'south'
        }
      } else {
        switch (value) {
          case 90:
            return 'east'
          case 180:
            return 'south'
          case 270:
            return 'west'
        }
      }
      break
    case 'L':
      if (currentDirection === 'east') {
        switch (value) {
          case 90:
            return 'north'
          case 180:
            return 'west'
          case 270:
            return 'south'
        }
      } else if (currentDirection === 'south') {
        switch (value) {
          case 90:
            return 'east'
          case 180:
            return 'north'
          case 270:
            return 'west'
        }
      } else if (currentDirection === 'west') {
        switch (value) {
          case 90:
            return 'south'
          case 180:
            return 'east'
          case 270:
            return 'north'
        }
      } else {
        switch (value) {
          case 90:
            return 'west'
          case 180:
            return 'south'
          case 270:
            return 'east'
        }
      }
      break
  }
}

const partOne = () => {
  const position = {
    x: 0,
    y: 0,
    direction: 'east',
  }
  input.forEach(instruction => {
    // console.log(instruction)
    const moveType = instruction.split('')[0]
    const moveValue = Number(
      instruction
        .split('')
        .slice(1)
        .join('')
    )
    switch (moveType) {
      case 'F':
        if (position.direction === 'east') {
          position.x = position.x + moveValue
        } else if (position.direction === 'south') {
          position.y = position.y + moveValue
        } else if (position.direction === 'west') {
          position.x = position.x - moveValue
        } else {
          position.y = position.y - moveValue
        }
        break
      case 'N':
        position.y = position.y - moveValue
        break
      case 'E':
        position.x = position.x + moveValue
        break
      case 'S':
        position.y = position.y + moveValue
        break
      case 'W':
        position.x = position.x - moveValue
        break
      case 'R':
        position.direction = changeDirection(
          moveType,
          moveValue,
          position.direction
        )
        break
      case 'L':
        position.direction = changeDirection(
          moveType,
          moveValue,
          position.direction
        )
        break
    }
  })
  return Math.abs(position.x) + Math.abs(position.y)
}

const rotateWaypointClockwise = (
  x: number,
  y: number,
  value: number
): { x: number; y: number } => {
  if (x === 0 || y === 0) {
    if (x === 0 && y > 0) {
      if (value === 90) {
        return {
          x: -y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: x,
          y: -y,
        }
      } else {
        return {
          x: y,
          y: x,
        }
      }
    } else if (x === 0 && y < 0) {
      if (value === 90) {
        return {
          x: Math.abs(y),
          y: x,
        }
      } else if (value === 180) {
        return {
          x: x,
          y: Math.abs(y),
        }
      } else {
        return {
          x: y,
          y: x,
        }
      }
    } else if (y === 0 && x > 0) {
      if (value === 90) {
        return {
          x: y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: -x,
          y: y,
        }
      } else {
        return {
          x: y,
          y: -x,
        }
      }
    } else {
      if (value === 90) {
        return {
          x: y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: Math.abs(x),
          y: y,
        }
      } else {
        return {
          x: y,
          y: Math.abs(x),
        }
      }
    }
  }

  let direction
  if (x < 0 && y < 0) {
    direction = 'NW'
  } else if (x > 0 && y < 0) {
    direction = 'NE'
  } else if (x > 0 && y > 0) {
    direction = 'SE'
  } else {
    direction = 'SW'
  }

  switch (direction) {
    case 'NE': // pos x neg y
      if (value === 90) {
        return {
          x: Math.abs(y),
          y: x,
        }
      } else if (value === 180) {
        return {
          x: -x,
          y: Math.abs(y),
        }
      } else {
        return {
          x: y,
          y: -x,
        }
      }
    case 'SE': // pos x pos y
      if (value === 90) {
        return {
          x: -y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: -x,
          y: -y,
        }
      } else {
        return {
          x: y,
          y: -x,
        }
      }
    case 'SW': // neg x pos y
      if (value === 90) {
        return {
          x: -y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: Math.abs(x),
          y: -y,
        }
      } else {
        return {
          x: y,
          y: Math.abs(x),
        }
      }
    case 'NW': // neg x neg y
      if (value === 90) {
        return {
          x: Math.abs(y),
          y: x,
        }
      } else if (value === 180) {
        return {
          x: Math.abs(x),
          y: Math.abs(y),
        }
      } else {
        return {
          x: y,
          y: Math.abs(x),
        }
      }
  }
}

const rotateWaypointCounterClockwise = (
  x: number,
  y: number,
  value: number
): { x: number; y: number } => {
  if (x === 0 || y === 0) {
    if (x === 0 && y > 0) {
      if (value === 90) {
        return {
          x: y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: x,
          y: -y,
        }
      } else {
        return {
          x: -y,
          y: x,
        }
      }
    } else if (x === 0 && y < 0) {
      if (value === 90) {
        return {
          x: y,
          y: x,
        }
      } else if (value === 180) {
        return {
          x: x,
          y: Math.abs(y),
        }
      } else {
        return {
          x: Math.abs(y),
          y: x,
        }
      }
    } else if (y === 0 && x > 0) {
      if (value === 90) {
        return {
          x: y,
          y: -x,
        }
      } else if (value === 180) {
        return {
          x: -x,
          y: y,
        }
      } else {
        return {
          x: y,
          y: x,
        }
      }
    } else {
      if (value === 90) {
        return {
          x: y,
          y: Math.abs(x),
        }
      } else if (value === 180) {
        return {
          x: Math.abs(x),
          y: y,
        }
      } else {
        return {
          x: y,
          y: x,
        }
      }
    }
  }
  let direction
  if (x < 0 && y < 0) {
    direction = 'NW'
  } else if (x > 0 && y < 0) {
    direction = 'NE'
  } else if (x > 0 && y > 0) {
    direction = 'SE'
  } else {
    direction = 'SW'
  }

  switch (direction) {
    case 'NE': // pos x neg y
      if (value === 90) {
        return {
          x: y,
          y: -x,
        }
      } else if (value === 180) {
        return {
          x: -x,
          y: Math.abs(y),
        }
      } else {
        return {
          x: Math.abs(y),
          y: x,
        }
      }
    case 'SE': // pos x pos y
      if (value === 90) {
        return {
          x: y,
          y: -x,
        }
      } else if (value === 180) {
        return {
          x: -x,
          y: -y,
        }
      } else {
        return {
          x: -y,
          y: x,
        }
      }
    case 'SW': // neg x pos y
      if (value === 90) {
        return {
          x: y,
          y: Math.abs(x),
        }
      } else if (value === 180) {
        return {
          x: Math.abs(x),
          y: -y,
        }
      } else {
        return {
          x: -y,
          y: x,
        }
      }
    case 'NW': // neg x neg y
      if (value === 90) {
        return {
          x: y,
          y: Math.abs(x),
        }
      } else if (value === 180) {
        return {
          x: Math.abs(x),
          y: Math.abs(y),
        }
      } else {
        return {
          x: Math.abs(y),
          y: x,
        }
      }
  }
}

const partTwo = () => {
  const position = {
    x: 0,
    y: 0,
  }
  let waypoint = {
    x: 10,
    y: -1,
  }
  input.forEach(instruction => {
    const moveType = instruction.split('')[0]
    const moveValue = Number(
      instruction
        .split('')
        .slice(1)
        .join('')
    )
    switch (moveType) {
      case 'F':
        position.x += moveValue * waypoint.x
        position.y += moveValue * waypoint.y
        break
      case 'N':
        waypoint.y -= moveValue
        break
      case 'E':
        waypoint.x += moveValue
        break
      case 'S':
        waypoint.y += moveValue
        break
      case 'W':
        waypoint.x -= moveValue
        break
      case 'R':
        waypoint = rotateWaypointClockwise(waypoint.x, waypoint.y, moveValue)
        break
      case 'L':
        waypoint = rotateWaypointCounterClockwise(
          waypoint.x,
          waypoint.y,
          moveValue
        )
        break
    }
  })
  return Math.abs(position.x) + Math.abs(position.y)
}

console.log('--- Day 12: Rain Risk ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
