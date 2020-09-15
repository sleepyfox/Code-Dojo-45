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
                      '/': (a, b) => a / b }
  var [operator, a, b] = expression

  if (Array.isArray(a)) {
    a = evaluate(a)
  }
  if (Array.isArray(b)) {
    b = evaluate(b)
  }

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
  var ast = [],
      i = 0,
      token = tokens[i]

  if (token !== '(') {
    return 'Error'
  } else {
    i++
    token = tokens[i]
  }

  while (token !== ')' && i < tokens.length) {
    if (token === '(') {
      ast.push(parse(tokens.slice(i)))
    } else if (isNaN(parseFloat(token))) {
      ast.push(token)
    } else {
      ast.push(parseFloat(token))
    }

    i++
    token = tokens[i]
  }
  return ast
}

module.exports = {
  calc: calc,
  lexx: lexx,
  parse: parse
}
