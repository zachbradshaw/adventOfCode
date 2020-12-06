export type GridCoordinate = {
  x: number
  y: number
  power?: boolean
  brightness?: number
  paintColor?: number
  painted?: boolean
  asteroid?: boolean
  tree?: boolean
}

export type Grid = GridCoordinate[]

type GenerateGridArgs = {
  width: number
  height: number
  power?: boolean
  brightness?: number
  paintColor?: number
  painted?: boolean
  asteroid?: boolean
  tree?: boolean
}

export const generateGrid = ({
  width,
  height,
  ...other
}: GenerateGridArgs): GridCoordinate[] => {
  let grid = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      grid.push({ ...other, x, y })
    }
  }
  return grid
}
