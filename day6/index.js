const { readInputSix } = require('../utils/readInput')

class DaySix {
  constructor(input) {
    this.groupAnswers = input
  }

  static fromInput(input) {
    return new DaySix(input)
  }

  partOne() {
    return this.groupAnswers.reduce((count, group) => {
      const unique = new Set(group.join('').split(''))
      return count + unique.size
    }, 0)
  }

  partTwo() {
    return this.groupAnswers.reduce((count, group) => {
      const groupMembers = group.length
      const answers = group.join('')

      const answerCounter = new Map()

      for (const ans of answers) {
        if (answerCounter.has(ans)) {
          answerCounter.set(ans, answerCounter.get(ans) + 1)
        } else {
          answerCounter.set(ans, 1)
        }
      }

      answerCounter.forEach((value, key) => {
        if (value === groupMembers) {
          count = count + 1
        }
      })

      return count

    }, 0)
  }
}

const main = () => {
  const input = readInputSix()
  daySix = DaySix.fromInput(input)
  console.log('part one', daySix.partOne())
  console.log('part two', daySix.partTwo())
}

main()