function calc(input_line) {
  const tokens      = lexx(input_line),
        expressions = parse(tokens),
        result      = evaluate(expressions)
  return result.toString()
}

function evaluate(expression) {
  const functions = { '+': (a, b) => a + b,
                      '-': (a, b) => a - b,
                      '*': (a, b) => a * b,
                      '/': (a, b) => a / b },
        [operator, a, b] = expression,
        argument1 = parseFloat(a),
        argument2 = parseFloat(b)

  if (operator in functions) {
    result = functions[operator](argument1, argument2)
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

function parse(tokens) {
  return tokens.slice(1,4)
}

module.exports = {
  calc: calc,
  lexx: lexx,
  parse: parse
}
