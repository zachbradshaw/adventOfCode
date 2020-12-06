import assert from 'assert'
import { getOpcode } from './getOpcode'
import { getParameterModes } from './getParameterModes'
import { getParams } from './getParams'
import { getJumpForward } from './getJumpForward'

enum Opcode {
  ADD = 1,
  MULTIPLY = 2,
  INPUT = 3,
  OUTPUT = 4,
  JUMP_IF_TRUE = 5,
  JUMP_IF_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
  RELBASE = 9,
  EXIT = 99,
}

type ComputerArgs = {
  program: string
  valueOverrides?: {
    [index: number]: number
  }[]
  input?: number[]
  returnEarly?: boolean
  startingIndex?: number
  startingJumpForward?: number
  returnMemory?: boolean
  paintRobot?: (n1: number, n2: number) => number
  breakout?: (memory?: number[]) => void
  returnVerbose?: boolean
  mazeRobot?: (someArg?: any, otherArg?: any) => number
}

export const computer = ({
  program,
  valueOverrides,
  input,
  returnEarly,
  startingIndex,
  startingJumpForward,
  returnMemory,
  paintRobot,
  breakout,
  returnVerbose,
  mazeRobot,
}: ComputerArgs): any => {
  // initialize computer's memory
  const memory: number[] = program.split(',').map(Number)

  // determine the initial increment amount used when looping through program
  let jumpForward: number =
    startingJumpForward ?? getJumpForward(getOpcode(memory[0]))

  // allow multiple values to be returned, when necessary
  let codeHistory: number[] = []

  // override memory values if necessary
  if (valueOverrides) {
    valueOverrides.forEach(override => {
      const key = Number(Object.keys(override))
      const value = Number(Object.values(override))

      memory[key] = value
    })
  }
  let relBase: number = 0

  for (
    let i = startingIndex ? startingIndex + jumpForward : 0;
    i < memory.length;
    i += jumpForward
  ) {
    // once initial instruction is complete, recalculate jumpForward on each loop iteration
    if (i !== 0 && i !== memory.length - 1) {
      jumpForward = getJumpForward(getOpcode(memory[i]))
    }

    const instruction = memory.slice(i, i + jumpForward)
    const opcode = getOpcode(instruction[0])
    let paramModes = getParameterModes(instruction[0])

    // now that we have the opcode and param modes parsed, remove it from the instruction and just leave the params
    instruction.shift()
    let params = getParams({
      modes: paramModes,
      section: instruction,
      memory,
      relBase,
      opcode,
    })

    switch (opcode) {
      case Opcode.ADD:
        memory[params[2]] = params[0] + params[1]
        break
      case Opcode.MULTIPLY:
        memory[params[2]] = params[0] * params[1]
        break
      case Opcode.INPUT:
        if (breakout) {
          let joystickMove = breakout(codeHistory)
          memory[params[0]] = Number(joystickMove)
          break
        }

        if (mazeRobot) {
          memory[params[0]] = input[0]
          break
        }
        assert(input)
        memory[params[0]] = input.shift()
        break
      case Opcode.OUTPUT:
        codeHistory.push(params[0])

        if (mazeRobot) {
          console.log('call robot')
          let robot = mazeRobot(input.shift(), codeHistory[0])
          console.log('robot direction', robot)
          input = robot
          codeHistory = []
        }

        if (paintRobot) {
          if (codeHistory.length === 2) {
            input = [paintRobot(codeHistory[0], codeHistory[1])]
            codeHistory = []
          }
        }

        if (returnEarly) {
          return {
            code: codeHistory[0],
            memory: memory.join(','),
            jumpForward,
            exitIndex: i,
          }
        }

        break
      case Opcode.JUMP_IF_TRUE:
        if (params[0] !== 0) {
          i = params[1] - jumpForward
        }
        break
      case Opcode.JUMP_IF_FALSE:
        if (params[0] === 0) {
          i = params[1] - jumpForward
        }
        break
      case Opcode.LESS_THAN:
        memory[params[2]] = params[0] < params[1] ? 1 : 0
        break
      case Opcode.EQUALS:
        memory[params[2]] = params[0] === params[1] ? 1 : 0
        break
      case Opcode.RELBASE:
        relBase += params[0]
        break
      case Opcode.EXIT:
        if (breakout) {
          return breakout(codeHistory)
        }
        return returnMemory
          ? memory
          : returnVerbose
          ? { codeHistory, memory }
          : codeHistory
    }
  }
}
