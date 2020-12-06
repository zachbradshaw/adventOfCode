export const getOpcode = (code: number): number => {
  if (code.toString().length > 1) {
    return Number(code.toString().slice(-2))
  }
  return code
}
