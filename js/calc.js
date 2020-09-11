function calc(input_line) {
  const tokens = lexx(input_line),
        argument1 = parseInt(tokens[1]),
        argument2 = parseInt(tokens[2])

  switch(tokens[0]) {
  case '-':
    return (argument1 - argument2).toString()
  case '+':
    return (argument1 + argument2).toString()
  case '*':
    return (argument1 * argument2).toString()
  case '/':
    return (argument1 / argument2).toString()
  default:
    return 'Error'
  }
}

function lexx(input_line) {
  return input_line.split(/\s+/)
}

module.exports = {
  calc: calc,
  lexx: lexx
}
