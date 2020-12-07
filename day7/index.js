const { Console } = require('console')
const { readInput } = require('../utils/readInput')
const { Bag } = require('./Luggage')

const parseInput = (input) => {

  const luggage = new Map()

  input.forEach((rule) => {
    const splitRule = rule.split(' contain ')

    // parsing the input string
    const parent = splitRule[0].split(' ').slice(0, -1).join(' ')
    let children = []
    if (splitRule[1] !== 'no other bags.') {
      children = splitRule[1].replace(/\s(bags)/g, '').replace(/(\.)/, '').replace(/\s(bag)/g, '').split(', ').map(item => {
        const split = item.split(' ')
        const amount = 1 * split[0]
        const bagString = split.slice(1).join(' ')

        let bag

        if (luggage.has(bagString)) {
          bag = luggage.get(bagString)
        } else {
          bag = new Bag(bagString, [])
          luggage.set(bagString, bag)
        }

        return {
          amount, bag
        }
      })
    }

    //checking if bag exists in luggage and creating new bag if not
    if (luggage.has(parent)) {
      const bag = luggage.get(parent)
      bag.addChildren(children)
    } else {
      bag = new Bag(parent, children)
      luggage.set(bag.parent, bag)
    }
  })

  return luggage
}

const digForGold = ({ parent, children }, memory) => {
  // console.log(parent)

  if (parent === 'shiny gold') {
    // console.log('gold here')
    return 1
  }

  if (children.length === 0) {
    // console.log('end here')
    return 0
  }

  for (const child of children) {

    const answer = digForGold(child.bag, memory)

    if (answer === 1) {
      return 1
    }
  }

  return 0
}

const partOne = (luggage) => {

  const memory = {}
  let count = 0

  // for each bag, do recursion
  luggage.forEach((bag) => {

    // console.log('\n\n\n start of', bag.parent)


    const ans = digForGold(bag, memory)
    count += ans

  })

  return count - 1
}

const countSubBags = (bag) => {
  const children = bag.children

  if (children.length === 0) {
    return 1
  }

  let count = 1

  for (const child of children) {
    count += child.amount * countSubBags(child.bag)
  }
  return count
}

const partTwo = (luggage) => {
  const shinyGold = luggage.get('shiny gold')
  return countSubBags(shinyGold) - 1
}

const main = () => {
  const input = readInput()
  const luggage = parseInput(input)
  console.log(partOne(luggage))
  console.log(partTwo(luggage))
}

main()