export const getJumpForward = (code: number): number => {
  switch (code) {
    case 3:
    case 4:
    case 9:
      return 2
    case 5:
    case 6:
      return 3
    default:
      return 4
  }
}
