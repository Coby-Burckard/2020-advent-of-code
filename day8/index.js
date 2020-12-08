const { isNull } = require('util')
const { readInput } = require('../utils/readInput')

class Instruction {
  constructor(operation, argument) {
    this.operation = operation
    this.argument = argument
    this.timesExecuted = 0
  }

  static fromString(line) {
    const args = line.split(' ')
    return new Instruction(args[0], 1 * args[1])
  }

  hasBeenExecuted() {
    return this.timesExecuted > 0
  }

  printOut() {
    return `${ this.operation } ${ this.argument } = ${ this.timesExecuted } times`
  }

  incrementTimesExecuted() {
    this.timesExecuted++
  }

  swapJmpAndNop() {
    if (this.operation === 'nop') {
      this.operation = 'jmp'
    } else if (this.operation === 'jmp') {
      this.operation = 'nop'
    }
  }
}

const readInList = (input) => {
  const instructionList = []
  for (const line of input) {
    instructionList.push(Instruction.fromString(line))
  }
  return instructionList
}

const updateIndexAndAccumulator = ({ index, accumulator }, instruction) => {

  let updatedInd = index
  let updatedAcc = accumulator

  switch (instruction.operation) {
    case 'nop':
      updatedInd++
      break
    case 'acc':
      updatedInd++
      updatedAcc = accumulator + instruction.argument
      break
    case 'jmp':
      updatedInd = index + instruction.argument
      break
    default:
      console.log('made it to default operation somehow')
  }

  return { updatedAcc, updatedInd }
}

const part1 = (instructionList, index = 0, accumulator = 0) => {
  const instruction = instructionList[index]

  if (instruction.hasBeenExecuted()) {
    return accumulator
  }

  instruction.incrementTimesExecuted()

  const { updatedInd, updatedAcc } = updateIndexAndAccumulator({ index, accumulator }, instruction)

  return part1(instructionList, updatedInd, updatedAcc)
}

const part2check = (instructionList, index = 0, accumulator = 0) => {
  const instruction = instructionList[index]

  if (instruction.hasBeenExecuted()) {
    return false
  }

  if (index === instructionList.length - 1) {
    const { updatedAcc } = updateIndexAndAccumulator({ index, accumulator }, instruction)
    return updatedAcc
  }

  instruction.incrementTimesExecuted()

  const { updatedInd, updatedAcc } = updateIndexAndAccumulator({ index, accumulator }, instruction)
  return part2check(instructionList, updatedInd, updatedAcc)
}

const part2 = (input) => {
  for (let i = 0; i < input.length; i++) {
    const instructionList = readInList(input)
    const instruction = instructionList[i]

    if (['nop', 'jmp'].includes(instruction.operation)) {
      instruction.swapJmpAndNop()
    }

    const result = part2check(instructionList)

    if (typeof result === 'number') {
      return result
    }
  }
}

const main = () => {
  const input = readInput()
  const instructionList = readInList(input)
  console.log('part 1', part1(instructionList))
  console.log('part 2', part2(input))
}

main()