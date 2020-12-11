const { readInput } = require('../utils/readInput')
const performance = require('perf_hooks').performance

//Part 1 (solution 2316)
//compares each step against the next until there is no chage and returns the number of steps

//function: oneStep
//loop through all empty/occupied seats and return an updated array

//function: lifeFindsAWay
//takes an index and applies the seating rules to return the index's new value

//Part 2
//modify visibility rule to be 5
//instead of searching adjacent seats, now must be first seat seen in 8 directions. 

//function: findVisibleSeat
// recursive function that takes a column direction, row direction, and seating array.
// calls self and advances 1 in each direction until a seat or wall is found

const findVisibleSeat = (seats, row, column, rowInc, colInc) => {
  const seat = seats[row] === undefined ? undefined : seats[row][column]

  switch (seat) {
    case undefined:
      return 0
    case 'L':
      return 0
    case '#':
      return 1
    default:
      return findVisibleSeat(seats, row + rowInc, column + colInc, rowInc, colInc)
  }
}

const lifeFindsAWay = (row, column, seats) => {
  const center = seats[row][column]

  if (center === '.') {
    return center
  }

  let occupied = 0

  for (let rMod = -1; rMod <= 1; rMod++) {
    for (let cMod = -1; cMod <= 1; cMod++) {
      if (!(rMod === 0 && cMod === 0)) {
        occupied += findVisibleSeat(seats, row + rMod, column + cMod, rMod, cMod)
      }
    }
  }

  if (center === 'L' && occupied === 0) {
    return '#'
  } else if (center === '#' && occupied >= 5) {
    return 'L'
  }

  return center
}

const oneStep = (input) => {
  return input.map((rowArray, row) => rowArray.map((seat, column) => lifeFindsAWay(row, column, input)))
}

const condenseArrangement = (seats) => {
  return seats.map((rowArray) => rowArray.join('')).join('')
}

const countOccupied = (seats) => {
  return seats.reduce((count, rowArray) => {
    rowArray.forEach((seat) => {
      if (seat === '#') {
        count++
      }
    })
    return count
  }, 0)
}

const partOne = (seats) => {
  const nextSeats = oneStep(seats)
  if (condenseArrangement(nextSeats) === condenseArrangement(seats)) {
    return countOccupied(seats)
  }

  return partOne(nextSeats)
}

const main = () => {
  const input = readInput('test.txt').map(value => value.split(''))
  console.log(partOne(input))
}

var t0 = performance.now()
main()
var t1 = performance.now()
console.log("Finished in " + (t1 - t0) + " milliseconds.")