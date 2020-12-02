const { readInput } = require('../utils/readInput')

const parseInput = (input) => {
  return input.map((value) => {
    const split = value.split(' ')
    return {
      range: split[0].split('-').map(value => value * 1),
      char: split[1].slice(0, -1),
      password: split[2]
    }
  })
}

const validatePassword1 = ({ range, char, password }) => {

  console.log(range, password, char)

  const count = { char: 0 }

  for (const letter of password) {
    if (!!count[letter]) {
      count[letter] = count[letter] + 1
    } else {
      count[letter] = 1
    }
  }

  if (count[char] >= range[0] && count[char] <= range[1]) {
    return true
  } else {
    return false
  }
}

validatePassword2 = ({ range, char, password }) => {
  return ((password.charAt(range[0] - 1) !== char) && (password.charAt(range[1] - 1) === char)) || ((password.charAt(range[0] - 1) === char) && (password.charAt(range[1] - 1) !== char))
}

const main = () => {
  const input = parseInput(readInput())

  let count = 0

  for (const password of input) {
    if (validatePassword2(password)) {
      console.log(count + 1, password)
      count += 1
    } else {
      console.log('invalid', password)
    }
  }
}

main()