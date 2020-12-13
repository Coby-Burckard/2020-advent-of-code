const { readInput } = require('../utils/readInput')
const math = require('mathjs')

const updateShip = (ship, line) => {
  let inst = line.charAt(0)
  let amount = line.slice(1)

  switch (inst) {
    case 'E':
      ship.position = math.add(ship.position, math.complex(amount, 0))
      break
    case 'S':
      ship.position = math.add(ship.position, math.complex(0, -amount))
      break
    case 'W':
      ship.position = math.add(ship.position, math.complex(-amount, 0))
      break
    case 'N':
      ship.position = math.add(ship.position, math.complex(0, amount))
      break
    case 'L':
      amount /= 90
      ship.dir = math.multiply(ship.dir, math.dotPow(math.complex(0, 1), amount))
      break
    case 'R':
      amount /= 90
      ship.dir = math.multiply(ship.dir, math.dotPow(math.complex(0, -1), amount))
      break
    case 'F':
      ship.position = math.add(ship.position, math.multiply(ship.dir, amount * 1))
  }
}

const partOne = (input) => {
  let ship = {
    position: math.complex(0, 0),
    dir: math.complex(1, 0)
  }

  let [maxX, maxY, minX, minY] = [0, 0, 0, 0]

  for (line of input) {
    updateShip(ship, line)

    const x = ship.position.re
    const y = ship.position.im

    if (x > maxX) {
      maxX = x
    }
    if (x < minX) {
      minX = x
    }
    if (y > maxY) {
      maxY = y
    }
    if (y < minY) {
      minY = y
    }
  }

  console.log('x: ', minX, maxX, 'y: ', minY, maxY)

  return Math.abs(ship.position.re) + Math.abs(ship.position.im)
}

const main = () => {
  const input = readInput()
  console.log(partOne(input))
}

main()