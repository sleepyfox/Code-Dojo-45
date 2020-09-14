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
        [operator, a, b] = expression

  if (operator in functions) {
    result = functions[operator](a, b)
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
  ast = tokens.slice(1,4)
  ast[1] = parseFloat(ast[1])
  ast[2] = parseFloat(ast[2])
  return ast
}

module.exports = {
  calc: calc,
  lexx: lexx,
  parse: parse
}
