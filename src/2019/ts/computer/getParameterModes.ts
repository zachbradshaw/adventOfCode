export const getParameterModes = (value: number): number[] => {
  const valString = value.toString()
  if (valString.length > 1) {
    const modes = valString
      .slice(0, -2)
      .split('')
      .reverse()
      .map(Number)
    while (modes.length < 3) {
      modes.push(0)
    }
    return modes
  }
  return [0, 0, 0]
}
