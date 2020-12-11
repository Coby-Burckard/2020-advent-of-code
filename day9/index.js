const { readInputToNum } = require('../utils/readInput')

const validateNum = (input, preamble = 25, index) => {
  const sumSet = input.slice(index - preamble, index)
  const ans = input[index]
  let valid = false

  for (const first of sumSet) {
    for (const second of sumSet) {
      if (first !== second) {
        if (first + second === ans) {
          return true
        }
      }
    }
  }
  return false
}

const findInvalidNum = (input, preamble = 25) => {
  for (let i = preamble; i < input.length; i++) {
    if (!validateNum(input, preamble, i)) {
      return { invalidNum: input[i], index: i }
    }
  }
  return 'all nums valid'
}

const findContSet = (inputSlice, set, max) => {
  if (inputSlice.length === 0) {
    return false
  }

  const setSum = set.reduce((sum, current) => sum + current, 0)

  if (setSum === max) {
    set.sort((a, b) => a - b)
    return set[0] + set[set.length - 1]
  }

  const newSet = [...set].concat([inputSlice[0]])

  return findContSet(inputSlice.slice(1), newSet, max)
}

const partTwo = (input, invalidIndex) => {
  const max = input[invalidIndex]
  for (let i = 0; i < invalidIndex; i++) {
    const inputSlice = input.slice(i, invalidIndex)

    const set = []
    const result = findContSet(inputSlice, set, max)

    if (typeof result === 'number') {
      return result
    }
  }
}

const main = () => {
  const input = readInputToNum()
  const { invalidNum, index } = findInvalidNum(input, 25)
  console.log('part 1', invalidNum)
  console.log('part 2', partTwo(input, index))
}

main()


const test = () => {



}