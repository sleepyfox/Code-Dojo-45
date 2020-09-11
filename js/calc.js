function calc(input_line) {
  const tokens = lexx(input_line),
        result = evaluate(tokens.slice(1,4))
  return result.toString()
}

function evaluate(expression) {
  const [operator, a, b] = expression,
        argument1 = parseFloat(a),
        argument2 = parseFloat(b)

  switch(operator) {
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
  return result
}

function lexx(input_line) {
  return input_line
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .trim()
    .split(/\s+/)
}

module.exports = {
  calc: calc,
  lexx: lexx
}
