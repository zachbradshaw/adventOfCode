import path from 'path'
import fs from 'fs'

const grid = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split(''))

const rowLength = grid[0].length

// construct an array of objects with coordinates as keys indicating
// where trees are located on the grid
const treeLocationsInRows = grid.map((row, rowIndex) => {
  let coords: { [coordinate: string]: boolean } = {}
  row.forEach((point, pointIndex) => {
    if (point === '#') {
      coords[`${pointIndex},${rowIndex}`] = true
    }
  })
  return coords
})

const findTrees = (slopes: { x: number; y: number }[]) => {
  const counts: number[] = []
  let count = 0
  slopes.forEach(slope => {
    for (let y = 0; y < grid.length; y += slope.y) {
      let coords =
        slope.y === 2
          ? `${(y / 2) % rowLength},${y}`
          : `${(y * slope.x) % rowLength},${y}`

      if (treeLocationsInRows[y][coords]) {
        count++
      }
    }
    counts.push(count)
    count = 0
  })
  return counts
}

console.log('--- Day 3: Toboggan Trajectory ---')
console.time('Completed in')
console.log('Part one:', findTrees([{ x: 3, y: 1 }])[0])
console.log(
  'Part two:',
  findTrees([
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]).reduce((prev, curr) => prev * curr)
)
console.timeEnd('Completed in')
