const { readInput } = require('../utils/readInput')

class Instruction {
  constructor(input) {
    this.direction = input.charAt(0)
    this.distance = input.slice(1)
  }

  print() {
    console.log(this.direction + this.distance)
  }
}

class Ship {
  constructor(x = 0, y = 0, direction = 'E') {
    this.x = x
    this.y = y
    this.direction = direction
  }

  move(instruction) {
    let xoff = 0
    let yoff = 0

    switch (instruction.direction) {
      case 'N':
        yoff = -1
        break
      case 'S':
        yoff = 1
        break
      case 'E':
        xoff = 1
        break
      case 'W':
        xoff = -1
        break
      default:
    }

    this.x += xoff * instruction.distance
    this.y += yoff * instruction.distance
  }

  rotate(instruction) {
    const cardinal = ['N', 'E', 'S', 'W']
    const currentIndex = cardinal.indexOf(this.direction)

    let indexOff = instruction.distance / 90
    if (instruction.direction === 'L') {
      indexOff = indexOff * -1
    }

    let newIndex = (currentIndex + indexOff) % cardinal.length

    if (newIndex < 0) {
      newIndex = 4 + newIndex
    }

    this.direction = cardinal[newIndex]
  }

  print() {
    console.log(`dir: ${ this.direction }, east: ${ this.x }, south: ${ this.y }`)
  }
}

//Part 1
//if direction is E/W/N/S then move apropriate direction
//if direction is L/R calc new position
//if direction is F build E/W/N/S direction then move ship

const partOne = (input) => {
  const ship = new Ship()

  for (line of input) {
    let instruction = new Instruction(line)

    if (['E', 'S', 'W', 'N'].includes(instruction.direction)) {
      ship.move(instruction)
    } else if (instruction.direction === 'F') {
      instruction.direction = ship.direction
      ship.move(instruction)
    } else {
      ship.rotate(instruction)
    }
  }

  return Math.abs(ship.x) + Math.abs(ship.y)
}

// Part 1 complex solution



//Part 2 
class Waypoint {
  constructor(x = 10, y = -1, direction = 'E') {
    this.x = x
    this.y = y
  }

  move(instruction) {
    let xoff = 0
    let yoff = 0

    switch (instruction.direction) {
      case 'N':
        yoff = -1
        break
      case 'S':
        yoff = 1
        break
      case 'E':
        xoff = 1
        break
      case 'W':
        xoff = -1
        break
      default:
    }
    // rotation doesn't line up with our frame of reference... fix me
    this.x += xoff * instruction.distance
    this.y += yoff * instruction.distance
  }

  rotate(instruction) {
    let rotation = instruction.distance * 1
    let direction = 'L'
    if (instruction.direction === 'R') {
      rotation = 360 - rotation
    }

    const distance = Math.sqrt(this.x * this.x + this.y * this.y)
    const oldAngle = Math.round(Math.atan2(-1 * this.y, this.x) * 180 / Math.PI)
    const angle = Math.atan2(-1 * this.y, this.x) + rotation / 180 * Math.PI

    this.x = Math.round(distance * Math.cos(angle))
    this.y = -1 * Math.round(distance * Math.sin(angle))
    console.log('roatating:', direction + rotation, 'old angle:', oldAngle, 'new angle:', Math.round(angle * 180 / Math.PI))
  }

  print() {
    console.log(`dir: ${ this.direction }, east: ${ this.x }, south: ${ this.y }`)
  }
}

class ShipTwo {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  moveToWaypoint(wayX, wayY, amount) {
    this.x += wayX * amount
    this.y += wayY * amount
  }
}

const partTwo = (input) => {
  const waypoint = new Waypoint()
  const ship = new ShipTwo()

  for (line of input) {
    let instruction = new Instruction(line)
    console.log('waypoint: ', 'south: ', waypoint.y, 'east: ', waypoint.x)
    console.log('ship: ', 'south: ', ship.y, 'east: ', ship.x)
    console.log('instruction: ', instruction.direction + instruction.distance)
    if (['E', 'S', 'W', 'N'].includes(instruction.direction)) {
      waypoint.move(instruction)
    } else if (instruction.direction === 'F') {
      ship.moveToWaypoint(waypoint.x, waypoint.y, instruction.distance)
    } else {
      waypoint.rotate(instruction)
    }
  }
  console.log('waypoint: ', 'south: ', waypoint.y, 'east: ', waypoint.x)
  console.log('ship: ', 'south: ', ship.y, 'east: ', ship.x)
  return Math.abs(ship.x) + Math.abs(ship.y)
}

const main = () => {
  const input = readInput()
  console.log(partOne(input))
  console.log(partTwo(input))
}

main()