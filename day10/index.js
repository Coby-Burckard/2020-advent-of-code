const performance = require('perf_hooks').performance
const { readInputToNum } = require('../utils/readInput')

var MODE = process.env.MODE || 'input'

const partOne = (input) => {
  const voltages = [0, ...input]
  voltages.sort((a, b) => a - b)
  voltages.push(voltages[voltages.length - 1] + 3)

  const count = { 1: 0, 3: 0 }

  voltages.forEach((volt, index) => {
    if (index !== 0) {
      const vDiff = volt - voltages[index - 1]
      if (vDiff === 1) {
        count[1]++
      } else if (vDiff === 3) {
        count[3]++
      }
    }
  })

  return count[1] * count[3]
}

getNodesArray = (volatages) => {
  const nodesArray = []
  for (let i = 0; i < volatages.length; i++) {
    let nodes = 0
    const current = volatages[i]
    for (let j = 1; j <= 3; j++) {
      const next = volatages[i + j]

      if (next !== undefined) {
        if (next - current <= 3) {
          nodes++
        }
      }
    }
    nodesArray.push(nodes)
  }
  return nodesArray
}

const finallySolvePartTwo = (nodes) => {
  const branchesArray = [...nodes]
  for (let i = nodes.length - 3; i >= 0; i--) {
    const validNodes = nodes[i]
    let totalBranches = 0
    for (let j = 1; j <= validNodes; j++) {
      totalBranches += branchesArray[i + j]
    }
    branchesArray[i] = totalBranches
  }
  return branchesArray[0]
}

const partTwo = (input) => {
  const voltages = [0, ...input]
  voltages.sort((a, b) => a - b)
  voltages.push(voltages[voltages.length - 1] + 3)
  return getNodesArray(voltages)
}

const main = () => {
  const file = `${ MODE }.txt`
  const input = readInputToNum(file)
  console.log('part 1', partOne(input))
  console.log('part 2', finallySolvePartTwo(partTwo(input)))
}

var t0 = performance.now()
main()
var t1 = performance.now()
console.log("Finished in " + (t1 - t0) + " milliseconds.")