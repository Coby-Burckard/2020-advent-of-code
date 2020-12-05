const { readInput } = require('../utils/readInput')

const bisection = (seat, minRow, maxRow) => {
  if (!seat) {
    return maxRow
  }

  const instruction = seat.charAt(0)

  if (instruction === 'F' || instruction === 'L') {
    const mid = Math.floor((minRow + maxRow) / 2)
    return bisection(seat.slice(1), minRow, mid)
  } else {
    const mid = Math.ceil((minRow + maxRow) / 2)
    return bisection(seat.slice(1), mid, maxRow)
  }
}

const findSeatID = (seat) => {
  return bisection(seat.slice(0, 7), 0, 127) * 8 + bisection(seat.slice(-3), 0, 7)
}

const part1 = (input) => {
  let max = 0
  input.forEach(seat => {
    const current = findSeatID(seat)
    if (current > max) {
      max = current
    }
  })
  return max
}

const part2 = (input) => {
  const seatIds = input.map(seat => findSeatID(seat))
  seatIds.sort((a, b) => a - b)
  seatIds.forEach((value, index) => {
    if (value - seatIds[index - 1] === 2) {
      console.log('part 2', value - 1)
    }
  })
}

const main = () => {
  const input = readInput()
  console.log('part 1', part1(input))
  part2(input)
}

main()