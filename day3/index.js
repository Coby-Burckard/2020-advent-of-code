const { readInput } = require('../utils/readInput')

const isTree = (xPos, row) => {
  return row.charAt(xPos % row.length) === '#'
}

const countTrees = (slope, yInc, rows, yPos, xPos) => {

  console.log(xPos, yPos)

  if (!!!rows[yPos]) {
    return 0
  }

  let tree = 0

  if (isTree(xPos, rows[yPos])) {
    console.log('found tree at', xPos, rows[yPos])
    tree = 1
  }

  return countTrees(slope, yInc, rows, yPos + yInc, xPos + slope) + tree
}

const main = (xInc = 3, yInc = 1) => {
  const rows = readInput()

  let answer = 1

  slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]

  for (const slope of slopes) {
    xInc = slope[0]
    yInc = slope[1]

    answer = answer * countTrees(xInc, yInc, rows, yInc, xInc)
  }

  console.log(answer)
}

main()