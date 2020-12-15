const { readInput } = require('../utils/readInput')

const parseInput = (input) => {
  return input.map(line => {
    const split = line.split(' = ')
    if (split[0].slice(0, 3) === 'mem') {
      split[0] = split[0].match(/[0-9]+/)[0]
    }
    return split
  })
}

const partOne = (input) => {
  const mem = {}
  let mask

  input.forEach((line) => {
    if (line[0] === 'mask') {
      mask = line[1].split('')
    } else {
      const num = (line[1] >>> 0).toString(2).split('')
      while (num.length < 36) {
        num.unshift('0')
      }
      mem[line[0]] = parseInt(num.map((char, index) => mask[index] !== 'X' ? mask[index] : char).join(''), 2)
    }
  })

  return Object.values(mem).reduce((acc, value) => acc + value)
}

const addressCombinations = (xAdd, mems, index) => {
  if (index === xAdd.length) {
    return parseInt(xAdd.join(''), 2)
  }

  if (xAdd[index] === 'X') {
    const oneAdd = [...xAdd]
    const zeroAdd = [...xAdd]
    oneAdd[index] = '1'
    zeroAdd[index] = '0'
    mems.push(addressCombinations(oneAdd, mems, index + 1))
    mems.push(addressCombinations(zeroAdd, mems, index + 1))
  } else {
    addressCombinations(xAdd, mems, index + 1)
  }
}

generateAddressVariants = (bitString) => {
  var addressArray = [];
  var chars = bitString.split('');
  var count = (bitString.match(/X/g)).length;
  var variants = [];

  // if the mask contains n floating bits, the amount of variants are 2^n
  // So we construct a bit strings for each variant. Example, if the mask contains
  // 3 floating bits, the variants are 000, 001, 010, 011, etc) 
  for (let i = 0; i < Math.pow(2, count); i++) {
    variants.push(i.toString(2).padStart(count, "0"));
  }

  // For each variant we construct the new address by concatenating characters of the address.
  // Whenever we come across a floating bit, we replace it with the corresponding character in the 
  // variant. For a mask with 3 floating bits it results in 2^3 unique addresses.
  for (let j = 0; j < variants.length; j++) {
    let index = 0;
    let address = '';
    chars.forEach(char => {
      if (char === 'X') {
        address += variants[j][index];
        index++;
      } else {
        address += char;
      }
    })
    addressArray.push(address);
  }
  return addressArray;
}


const partTwo = (input) => {
  const mem = {}
  const addresses = new Map()
  let mask

  input.forEach((line) => {
    if (line[0] === 'mask') {
      console.log('new mask', line[1])
      mask = line[1].split('')
    } else {
      const num = (line[0] >>> 0).toString(2).split('')
      while (num.length < 36) {
        num.unshift('0')
      }
      console.log(num.join(''))
      addresses.set(line[0], { xmem: num.map((char, index) => (mask[index] === '1' || mask[index] === 'X') ? mask[index] : char), num: line[1] })
    }
  })

  addresses.forEach(({ xmem, num }) => {
    // console.log('in loop value:', xmem.join(''), 'keSy:', key)
    const mems = generateAddressVariants(xmem.join(''))

    mems.forEach(newMem => {
      mem[newMem] = 1 * num
      if (newMem < 1) {
        console.log('mem loc: ', newMem, num)
      }
    })
  })
  console.log(Object.values(mem))
  return Object.values(mem).reduce((acc, value) => acc + value)
}

const main = () => {
  const input = parseInput(readInput())
  // console.log(partOne(input))
  console.log(partTwo(input))
}

main()