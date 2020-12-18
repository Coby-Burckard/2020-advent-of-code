const { readInput } = require('../utils/readInput')

const doMath = (startIndex = 0, input) => {
  /*
    options for char at index
      ( = look left and perform operation with a new call to do math (i + 1) and total
      * = move to next index
      + = move to next index
      num = perform operation at index - 1 (add(for '(' or +), mult) with total
      ) = return total
  */
  let total = 0
  for (let index = startIndex; index < input.length; index++) {
    const current = input[index]
    const previous = input[index - 1]
    if (current === '(') {
      const [newIndex, num] = doMath(index + 1, input)
      index = newIndex
      if ([undefined, '(', '+'].includes(previous)) {
        total += num
      }
      else {
        total *= num
      }
    }
    else if (current.match(/[0-9]/) !== null) {
      if ([undefined, '(', '+'].includes(previous)) {
        total += 1 * current
      }
      else {
        total *= 1 * current
      }
    }
    else if (current === ')') {
      return [index, total]
    }
  }
  return total
}

const partOne = (input) => {
  let sum = 0
  for (line of input) {
    sum += doMath(0, line)
  }
  return sum
}

const main = () => {
  const input = readInput().map(line => line.replace(/ /g, '').split(''))
  console.log('part one:', partOne(input))
}

main()