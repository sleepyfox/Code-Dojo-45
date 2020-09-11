function calc(input_line) {
  tokens = lexx(input_line)
  switch(tokens[0]) {
  case '-':
    return (parseInt(tokens[1]) - parseInt(tokens[2])).toString()
  case '+':
    return (parseInt(tokens[1]) + parseInt(tokens[2])).toString()
  case '*':
    return (parseInt(tokens[1]) * parseInt(tokens[2])).toString()
  case '/':
    return (parseInt(tokens[1]) / parseInt(tokens[2])).toString()
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
