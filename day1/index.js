const fs = require('fs')

const readInput = (file = 'input.txt') => {
  const data = fs.readFileSync(file).toString().split('\r')
  return data.map((value) => 1 * value)
}

const sumOfN = (input, SUM = 2020, memoize = {}) => {
  //finding two numbers (a &b) where sum is input

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        const a = input[i]
        const b = input[j]
        const c = input[k]
        const solution = a * b * c

        const memKey = `i${ i }j${ j }`;

        if (i === j || j === k || i === k || i > SUM || j > SUM || k > SUM) {
          memoize[memKey] = false
        } else if (a + b + c === 2020) {
          memoize[memKey] = solution
          return solution
        } else {
          memoize[memKey] = false
        }

      }
    }
  }
}

const main = () => {
  const input = readInput()
  console.log(input)
  const solution = sumOfN(input)
  console.log(solution)
}

main()