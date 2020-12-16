const parseFields = (fields) => {
  return fields.map(row => {
    const splitRow = row.split(': ')
    return field = {
      name: splitRow[0],
      range: splitRow[1].split(' or ').map(ran => ran.split('-').map(value => value * 1))
    }
  })
}

const parseTickets = (tickets) => {
  return tickets.map(ticket => ticket.split(','))
}

module.exports = { parseFields, parseTickets }