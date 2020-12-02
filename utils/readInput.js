const fs = require('fs')

const readInput = (file = 'input.txt') => {
  try {
    const data = fs.readFileSync(file).toString().split('\r')
    return data.map((value) => value.replace(/(\r\n|\n|\r)/gm, ""))
  }
  catch {
    throw new Error(`unable to read from ${ file }`)
  }
}

const readInputToNum = (file = 'input.txt') => {
  const data = readInput(file)
  return data.map(value => value * 1)
}

module.exports = {
  readInput: readInput,
  readInputToNum: readInputToNum
}