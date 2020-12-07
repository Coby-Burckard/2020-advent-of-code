/*
  data structures

  Bag: 
  parent = string
  children = []{amount: num, bag: bag}
*/

class Bag {
  constructor(parent, children) {
    this.parent = parent
    this.children = children
  }

  static newNullBag() {
    return new Bag(null, null)
  }

  addChildren(newChildren) {
    this.children = this.children.concat(newChildren)
  }
}

module.exports = {
  Bag: Bag
}