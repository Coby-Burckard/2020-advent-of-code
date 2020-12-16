const { readInput } = require('../utils/readInput')
const { parseFields, parseTickets } = require('./parsers')

/*
  Tickets: array of arrays containing the values from each ticket
  Fields: object 
    name: name of field
    range: array[[min1, max1], [min2, max2]]
*/

partOne = (tickets, fields) => {
  const validRanges = Object.values(fields).reduce((acc, { range }) => acc.concat(range, []), [])
  const allTickets = tickets.reduce((acc, row) => acc.concat(row).map(ticket => ticket * 1), [])
  return allTickets.reduce((acc, ticket) => {
    for (range of validRanges) {
      if (ticket >= range[0] && ticket <= range[1]) {
        return acc
      }
    }
    return acc + ticket
  }, 0)
}


/*
Part two 
  Function: removeInvalidTickets
    filters tickets with an invalid field

  Function: partTwo
    loop through each field
      loop though each ticket[i] and determine the i where no ticket[i] violates the field ranges
    assign field.index = valid i
*/

const removeInvalidTickets = (tickets, fields) => {
  const validRanges = Object.values(fields).reduce((acc, { range }) => acc.concat(range, []), [])
  const allTickets = tickets.map(row => row.map(ticket => ticket * 1))
  return allTickets.filter((ticket, index) => {
    return ticket.reduce((acc, field) => {
      for (range of validRanges) {
        if (field >= range[0] && field <= range[1]) {
          return acc
        }
      }
      console.log(`ticket ${ index } invalid due to value ${ field }`)
      return acc && false
    }, true)
  })
}

const partTwo = (tickets, fields) => {
  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    for (let ticketIndex = 0; ticketIndex < tickets[0].length; ticketIndex++) {
      let match = true
      const field = fields[fieldIndex]
      for (let ticketNumber = 0; ticketNumber < tickets.length; ticketNumber++) {
        const ticket = tickets[ticketNumber]
        const fieldValue = 1 * ticket[ticketIndex]
        if (!((field.range[0][0] <= fieldValue && field.range[0][1] >= fieldValue) || (field.range[1][0] <= fieldValue && field.range[1][1] >= fieldValue))) {
          match = match && false
        }
      }
      if (match) {
        field.index = ticketIndex
        break
      }
    }
  }
  return fields.map(field => `${ field.name } - ${ field.index }`)
}


const main = () => {
  const tickets = parseTickets(readInput('testtickets.txt'))
  const fields = parseFields(readInput('testfields.txt'))
  console.log('part one:', partOne(tickets, fields))
  console.log(tickets.length)
  const redTickets = removeInvalidTickets(tickets, fields)
  console.log(redTickets.length)
  console.log('part two:', partTwo(redTickets, fields))
}

main()