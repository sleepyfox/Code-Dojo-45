function calc(input_line) {
  const tokens = lexx(input_line),
        result = evaluate(tokens.slice(1,4))
  return result.toString()
}

function evaluate(expression) {
  const [operator, a, b] = expression,
        argument1 = parseFloat(a),
        argument2 = parseFloat(b),
        functions = { '+': (a, b) => a + b,
                      '-': (a, b) => a - b,
                      '*': (a, b) => a * b,
                      '/': (a, b) => a / b }

  if (operator in functions) {
    result = functions[operator].call(this, argument1, argument2)
  } else {
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
