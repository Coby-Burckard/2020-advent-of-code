const { readInput } = require('../utils/readInput')

const partOne = (departure, busses) => {
  let minWait = busses[0]
  let minIndex = 0
  busses.forEach((bus, index) => {
    if (bus !== 'x') {
      const wait = Math.ceil(departure / bus) * bus - departure
      if (wait < minWait) {
        minWait = wait
        minIndex = index
      }
    }
  })
  return minWait * busses[minIndex]
}

const partTwo = (busses) => {
  let step = 1
  let time = 0

  busses.forEach((bus, index) => {
    if (bus !== 'x') {
      while (true) {
        if ((time + index) % bus === 0) {
          step *= bus
          break
        }
        time += step
      }
    }
  })

  return time
}

const main = () => {
  const input = readInput()
  departure = 1002618
  busses = input[1].split(', ')
  console.log('partOne', partOne(departure, busses))
  console.log('partTwo', partTwo(busses))
}

main()