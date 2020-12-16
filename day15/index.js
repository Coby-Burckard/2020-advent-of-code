const { readInput } = require('../utils/readInput')

const partOne = (startValues) => {
  const mem = {}
  const history = []

  startValues.forEach((value, index) => {
    mem[value] = index
    history.push(value)
  })

  let next = history.pop()
  let last
  mem[next] = undefined

  for (let index = startValues.length - 1; index < 30000000; index++) {
    const lastTimeSaid = mem[next]
    last = next
    mem[next] = index
    next = lastTimeSaid === undefined ? 0 : index - lastTimeSaid

    if (index % 1000 === 0) {
      console.log(index)
    }
  }


  return last
}

const main = () => {
  const input = readInput()[0].split(',')
  console.log(partOne(input))
}

main()