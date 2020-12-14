import path from 'path'
import fs from 'fs'
import chalk from 'chalk'

const input = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')

let grid = {}
for (let y = 0; y < input.length; y++) {
  const row = input[y].split('')
  for (let x = 0; x < row.length; x++) {
    grid[`${x},${y}`] = row[x]
  }
}

const calculateSlope = (x1, y1, x2, y2) => {
  return Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)
}

const getCoordsToCheck = (x: number, y: number): [number, number][] => {
  return [
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
  ]
}

const partOne = grid => {
  let newGrid: { [coord: string]: string } = {}
  const coords = Object.keys(grid)
  let seatState = Object.values(grid).join('')
  let ans

  coords.forEach(coord => {
    const [x, y] = coord.split(',').map(Number)
    const toCheck = getCoordsToCheck(x, y)

    if (grid[coord] === 'L') {
      const allEmpty = toCheck.every(coord => {
        return grid[`${coord[0]},${coord[1]}`] !== '#'
      })

      newGrid[coord] = allEmpty ? '#' : 'L'
    } else if (grid[coord] === '#') {
      const numOccupied = toCheck.reduce((prev, curr) => {
        if (grid[`${curr[0]},${curr[1]}`] === '#') {
          return prev + 1
        }
        return prev
      }, 0)

      newGrid[coord] = numOccupied >= 4 ? 'L' : '#'
    } else {
      newGrid[coord] = '.'
    }
  })

  const newSeatState = Object.values(newGrid).join('')
  if (seatState !== newSeatState) {
    partOne(newGrid)
  } else {
    console.log(
      'Part one:',
      newSeatState.split('').filter(seat => seat === '#').length
    )
  }
}

const getAllCoordsToCheck = (x: number, y: number): [number, number][] => {
  const slopes = []
  for (let i = 0; i < 8; i++) {
    const coords = []
    switch (i) {
      case 0:
        for (let j = 1; j < input.length; j++) {
          coords.push([x, y - j])
        }
        break
      case 1:
        for (let j = 1; j < input.length; j++) {
          coords.push([x + j, y - j])
        }
        break
      case 2:
        for (let j = 1; j < input.length; j++) {
          coords.push([x + j, y])
        }
        break
      case 3:
        for (let j = 1; j < input.length; j++) {
          coords.push([x + j, y + j])
        }
        break
      case 4:
        for (let j = 1; j < input.length; j++) {
          coords.push([x, y + j])
        }
        break
      case 5:
        for (let j = 1; j < input.length; j++) {
          coords.push([x - j, y + j])
        }
        break
      case 6:
        for (let j = 1; j < input.length; j++) {
          coords.push([x - j, y])
        }
        break
      case 7:
        for (let j = 1; j < input.length; j++) {
          coords.push([x - j, y - j])
        }
        break
    }
    slopes.push(coords)
  }
  return slopes
}

const partTwo = grid => {
  let newGrid = {}
  const coords = Object.keys(grid)
  let seatState = Object.values(grid).join('')

  coords.forEach((coord, index) => {
    const [x, y] = coord.split(',').map(Number)
    const toCheck = getAllCoordsToCheck(x, y)

    if (grid[coord] === 'L') {
      let results = []
      for (let i = 0; i < toCheck.length; i++) {
        let set = toCheck[i]
        let firstSeat = []
        for (let j = 0; j < set.length; j++) {
          const coord = set[j]
          if (
            grid[`${coord[0]},${coord[1]}`] &&
            grid[`${coord[0]},${coord[1]}`] !== '.'
          ) {
            firstSeat.push(grid[`${coord[0]},${coord[1]}`])
            break
          }
        }
        results.push(firstSeat[0])
      }

      const occupied = results.filter(seat => seat === '#')
      newGrid[coord] = occupied.length === 0 ? '#' : 'L'
    } else if (grid[coord] === '#') {
      let results = []
      for (let i = 0; i < toCheck.length; i++) {
        let set = toCheck[i]
        let firstSeat = []
        for (let j = 0; j < set.length; j++) {
          const coord = set[j]
          if (
            grid[`${coord[0]},${coord[1]}`] &&
            grid[`${coord[0]},${coord[1]}`] !== '.'
          ) {
            firstSeat.push(grid[`${coord[0]},${coord[1]}`])
            break
          }
        }
        results.push(firstSeat[0])
      }
      const occupied = results.filter(seat => seat === '#')
      newGrid[coord] = occupied.length > 4 ? 'L' : '#'
    } else {
      newGrid[coord] = '.'
    }
  })
  coords.forEach((coord, index) => {})
  const newSeatState = Object.values(newGrid).join('')

  // uncomment to see grid animate
  // draw grid
  // const newSeatStateGrid = Object.values(newGrid)
  // const gridLines = []
  // let line = []
  // newSeatStateGrid.forEach((coord, index) => {
  //   if (index % input[0].length === 0) {
  //     gridLines.push(line)
  //     line = []
  //     line.push(coord)
  //   } else {
  //     line.push(coord)
  //   }
  // })
  // gridLines.push(line)

  // console.clear()
  // gridLines.forEach(line => {
  //   console.log(chalk.red(line.join('')))
  // })

  if (seatState !== newSeatState) {
    partTwo(newGrid)
  } else {
    console.log(
      'Part two:',
      newSeatState.split('').filter(seat => seat === '#').length
    )
  }
}

console.log('--- Day 11: Seating System ---')
console.time('Completed in')
partOne(grid)
partTwo(grid)
console.timeEnd('Completed in')
