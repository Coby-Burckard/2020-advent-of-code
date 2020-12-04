const { readInput4 } = require('../utils/readInput')


class Day4 {
  constructor(passports) {
    this.passports = passports
  }

  static initializeFromInput(input) {
    return new Day4(input.map((passport) => {
      const passportFields = passport.split(' ')
      const passportFieldsDict = {}

      passportFields.forEach((field) => {
        if (!!field) {
          const keyVal = field.split(':')
          passportFieldsDict[keyVal[0]] = keyVal[1]
        }
      })

      return passportFieldsDict
    }))
  }

  printMe() {
    console.log(this.passports)
  }

  partOne(reqFields = ['ecl', 'eyr', 'byr', 'iyr', 'hgt', 'hcl', 'pid'], optFields = ['cid']) {

    console.log(this.passports.length)

    return this.passports.reduce((count, passport) => {
      let valid = true;

      for (const req of reqFields) {
        valid = valid && passport[req] !== undefined
      }

      const add = valid ? 1 : 0

      return count + add
    }, 0)
  }

  partTwo() {

    return this.passports.reduce((count, { byr, ecl, eyr, iyr, hgt, hcl, pid }) => {
      let valid = true

      if (byr === undefined || byr < 1910 || byr > 2002) {
        valid = false
      }

      if (iyr === undefined || iyr < 2010 || iyr > 2020) {
        valid = false
      }

      if (eyr === undefined || eyr < 2020 || eyr > 2030) {
        valid = false
      }

      if (hgt === undefined || hgt === undefined) {
        valid = false
      } else {
        const unit = hgt.slice(-2)
        const num = 1 * hgt.slice(0, -2)

        if (unit === 'cm') {
          if (num < 150 || num > 193) {
            valid = false
          }
        } else if (unit === 'in') {
          if (num < 59 || num > 76) {
            valid = false
          }
        } else {
          valid = false
        }
      }

      if (hcl === undefined || !hcl.match(/^#[a-f0-9]{6}$/)) {
        valid = false
      }

      if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) {
        valid = false
      }

      if (pid === undefined || !pid.match(/^[0-9]{9}$/)) {
        valid = false
      }

      const add = valid ? 1 : 0

      return count + add

    }, 0)

  }

}

const main = () => {
  const day4 = Day4.initializeFromInput(readInput4('input.txt', '\r \r'))
  console.log(day4.partTwo())
}

main()