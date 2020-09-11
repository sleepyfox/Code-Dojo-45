function calc(input_line) {
  const tokens    = lexx(input_line),
        argument1 = parseFloat(tokens[1]),
        argument2 = parseFloat(tokens[2])

  var result = ""

  switch(tokens[0]) {
  case '-':
    result = argument1 - argument2
    break
  case '+':
    result = argument1 + argument2
    break
  case '*':
    result = argument1 * argument2
    break
  case '/':
    result = argument1 / argument2
    break
  default:
    result = 'Error'
  }
  return result.toString()
}

function lexx(input_line) {
  return input_line.split(/\s+/)
}

module.exports = {
  calc: calc,
  lexx: lexx
}
