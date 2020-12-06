type GetPositionParamArgs = {
  mode: number
  index: number
  memory: number[]
  relBase: number
}
const getPositionParam = ({
  mode,
  index,
  memory,
  relBase,
}: GetPositionParamArgs): number => {
  let param = index
  switch (mode) {
    case 0:
      param = memory[index] ?? 0
      break
    case 1:
      break
    case 2:
      param = memory[param + relBase]
      break
  }
  return param
}

type GetDestParamArgs = {
  mode: number
  index: number
  relBase: number
  output?: boolean
  memory: number[]
}
const getDestParam = ({
  mode,
  index,
  relBase,
  output,
  memory,
}: GetDestParamArgs): number => {
  let param = index
  switch (mode) {
    case 0:
      if (output) {
        param = memory[index] || 0
      }
      break
    case 1:
      break
    case 2:
      if (output) {
        return memory[param + relBase] || 0
      }
      return (param += relBase)
  }
  return param
}

type GetParamsArgs = {
  modes: number[]
  section: number[]
  memory: number[]
  relBase: number
  opcode?: number
}
export const getParams = ({
  modes,
  section,
  memory,
  relBase,
  opcode,
}: GetParamsArgs): number[] => {
  if (opcode === 3 || opcode === 4) {
    return [
      getDestParam({
        mode: modes[0],
        index: section[0],
        memory,
        relBase,
        output: opcode === 4 ? true : false,
      }),
    ]
  }
  if (opcode === 9) {
    return [
      getPositionParam({ mode: modes[0], index: section[0], memory, relBase }),
    ]
  }
  const params = section.map((value, index) => {
    const mode = modes[index]
    const initialParam = value

    if (index === 2) {
      return getDestParam({
        mode,
        index: initialParam,
        memory,
        relBase,
      })
    }

    return getPositionParam({
      mode,
      index: initialParam,
      memory,
      relBase,
    })
  })

  return params
}
