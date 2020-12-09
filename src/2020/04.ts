import path from 'path'
import fs from 'fs'

const parse = fs
  .readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8')
  .trim()
  .split(' ')
  .join('\n')
  .split('\n')

const yearTest = (year: string, min: number, max: number): boolean =>
  year.length !== 4 || Number(year) < min || Number(year) > max
const eclTest = (val: string): boolean =>
  !'amb blu brn gry grn hzl oth'.includes(val)
const hclTest = (val: string): boolean => {
  const splitVal = val.split('')
  const hash = splitVal[0]
  let validChars = true
  const alphaNums = splitVal.slice(1, 7)
  const rx = /[a-f0-9]+/
  alphaNums.forEach(char => {
    if (!rx.test(char)) {
      validChars = false
    }
  })

  return hash !== '#' || alphaNums.join('').length !== 6 || !validChars
}
const pidTest = (val: string): boolean => val.length !== 9
const hgtTest = (val: string): boolean => {
  const height = Number(
    val
      .split('')
      .slice(0, val.split('').length - 2)
      .join('')
  )
  const unit = val
    .split('')
    .slice(val.split('').length - 2)
    .join('')

  if (unit !== 'cm' && unit !== 'in') {
    return true
  }
  if (unit === 'cm') {
    return height < 150 || height > 193
  }
  if (unit === 'in') {
    return height < 59 || height > 76
  }
  return false
}

const partOne = () => {
  const passports: string[][] = []
  let fields: string[] = []
  parse.forEach((field, index) => {
    if (field !== '') {
      fields.push(field.slice(0, 3))
      if (index === parse.length - 1) {
        passports.push(fields)
      }
    } else {
      passports.push(fields)
      fields = []
    }
  })

  let valid = 0
  passports.forEach(passport => {
    if (passport.length === 8) {
      valid++
    } else {
      if (passport.length === 7 && passport.indexOf('cid') < 0) {
        valid++
      }
    }
  })
  return valid
}

type PassportField = { field: string; val: string }
const partTwo = () => {
  const passports: PassportField[][] = []
  let fields: PassportField[] = []
  parse.forEach((f, index) => {
    if (f !== '') {
      const [field, val] = f.split(':')
      fields.push({ field, val })
      if (index === parse.length - 1) {
        passports.push(fields)
      }
    } else {
      passports.push(fields)
      fields = []
    }
  })

  let validPass = 0
  passports.forEach(passport => {
    let status = true
    if (passport.length <= 7) {
      status = false
      if (
        passport.length === 7 &&
        !passport.find(field => field.field === 'cid')
      ) {
        status = true
      }
    }

    if (status) {
      passport.forEach(field => {
        switch (field.field) {
          case 'byr':
            if (yearTest(field.val, 1920, 2002)) {
              status = false
            }
            break
          case 'iyr':
            if (yearTest(field.val, 2010, 2020)) {
              status = false
            }
            break
          case 'eyr':
            if (yearTest(field.val, 2020, 2030)) {
              status = false
            }
            break
          case 'ecl':
            if (eclTest(field.val)) {
              status = false
            }
            break
          case 'hcl':
            if (hclTest(field.val)) {
              status = false
            }
            break
          case 'pid':
            if (pidTest(field.val)) {
              status = false
            }
            break
          case 'hgt':
            if (hgtTest(field.val)) {
              status = false
            }
            break
        }
      })
      if (status) {
        validPass++
      }
      status = true
    }
  })
  return validPass
}

console.log('--- Day 4: Passport Processing ---')
console.time('Completed in')
console.log('Part one:', partOne())
console.log('Part two:', partTwo())
console.timeEnd('Completed in')
