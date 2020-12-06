import path from 'path'
import fs from 'fs'
import { computer } from './computer/computer'

const program = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()

type GameTile = {
  visual: string
  type: string
}
const drawGameTile = (tileId: number): GameTile => {
  switch (tileId) {
    case 1:
      return { visual: '|', type: 'wall' }
    case 2:
      return { visual: '#', type: 'block' }
    case 3:
      return { visual: '_', type: 'paddle' }
    case 4:
      return { visual: '•', type: 'ball' }
    default:
      return { visual: '.', type: 'empty' }
  }
}
const partOne = () => {
  const instructions = computer({ program, input: [] })

  const game: number[][] = []
  while (instructions.length) {
    game.push(instructions.splice(0, 3))
  }

  const gameView: { x: number; y: number; tile: GameTile }[] = []
  game.forEach(command => {
    const [x, y, tileId] = command
    gameView.push({ x, y, tile: drawGameTile(tileId) })
  })

  const visuals = []
  let line = []
  gameView.forEach(tile => {
    if (tile?.x < 41) {
      line.push(tile?.tile.visual)
    } else {
      line.push(tile?.tile.visual)
      visuals.push(line)
      line = []
    }
  })
  visuals.forEach(line => console.log(line.join('')))

  return gameView.filter(i => i.tile.type === 'block').length
}

const partTwo = (joystick: number) => {
  const game: number[][] = []
  let score = 0

  const playBreakout = memory => {
    if (!game.length) {
      while (memory.length) {
        game.push(memory.splice(0, 3))
      }
    }

    if (game.length && memory.length) {
      const updates = []
      while (memory.length) {
        updates.push(memory.splice(0, 3))
      }
      updates.forEach(update => {
        const [x, y, tileId] = update
        if (x === -1 && y === 0) {
          score = tileId
        } else {
          let tileToUpdate = game.indexOf(
            game.find(point => point[0] === x && point[1] === y)
          )

          game[tileToUpdate] = update
        }
      })
    }

    const gameView = game
      .map(command => {
        const [x, y, tileId] = command

        return { x, y, tile: drawGameTile(tileId, x, y) }
      })
      .filter(point => point !== undefined)

    const visuals = []
    let line = []
    gameView.forEach(tile => {
      if (tile?.x < 41) {
        line.push(tile?.tile.visual)
      } else {
        line.push(tile?.tile.visual)
        visuals.push(line)
        line = []
      }
    })
    // uncomment to see game play itself
    // console.clear()
    // visuals.forEach(line => console.log(line.join('')))

    const ball = gameView.filter(piece => piece.tile.type === 'ball')[0]
    const paddle = gameView.filter(piece => piece.tile.type === 'paddle')[0]
    return movePaddle(ball.x, paddle.x)
  }

  const movePaddle = (ball, paddle) => {
    if (ball > paddle) {
      return 1
    } else if (ball < paddle) {
      return -1
    } else {
      return 0
    }
  }
  computer({
    input: [0],
    program,
    breakout: playBreakout,
    valueOverrides: [{ 0: 2 }],
  })

  return score
}
console.log('--- Day 13: Care Package ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
