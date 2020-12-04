const fs = require('fs')

const readInput = (file = 'input.txt', splitOn = '\r') => {
  try {
    const data = fs.readFileSync(file).toString().split(splitOn)
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

const readInput4 = (file = 'input.txt', splitOn = '\r') => {
  try {
    const data = fs.readFileSync(file).toString().replace(/(\n)/gm, ' ')
    const newData = data.split(splitOn)
    return newData.map((value) => value.replace(/(\r\n|\n|\r)/gm, ""))
  }
  catch {
    throw new Error(`unable to read from ${ file }`)
  }
}

module.exports = {
  readInput: readInput,
  readInput4: readInput4,
  readInputToNum: readInputToNum
}
