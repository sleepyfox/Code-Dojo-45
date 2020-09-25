function calc(input_line) {
  const tokens      = lexx(input_line),
        expressions = parse(tokens),
        result      = evaluate(expressions)
  return result.toString()
}

function flatten(a) {
  if (Array.isArray(a)) {
    return evaluate(a)
  } else {
    return a
  }
}

function evaluate(expression) {
  const functions = { '+': (a, b) => a + b,
                      '-': (a, b) => a - b,
                      '*': (a, b) => a * b,
                      '/': (a, b) => a / b },
        unnested_expression = expression.map(flatten),
        [operator, a, b] = unnested_expression

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

// Inner recursive descent parser
// Params: (t) is a list of string tokens
// Output: [n, e]
//   n is the number of tokens parsed
//   e is the parsed subexpression
function inner_parse(t) {
  var tokens = t,
      count = 1, // first skip the opening paren
      ast = [],
      n = 0,
      expr = []

  // Numbers are converted, strings are left as is
  var convert = (t) => {
    if (isNaN(parseFloat(t))) {
      return t
    } else {
      return parseFloat(t)
    }
  }

  while (tokens[count] != ')') {
    if (tokens[count] == '(') {
      [n, expr] = inner_parse(tokens.slice(count))
      count = count + n
      ast.push(expr)
    } else {
      ast.push(convert(tokens[count]))
      count++
    }
  }
  //    console.log(ast, count)
  return [count + 1, ast]
}

function parse(tokens) {
  // This can only be this simple because we decide that all expressions
  // Must be s-expressions
  return inner_parse(tokens)[1]
}

module.exports = {
  calc: calc,
  lexx: lexx,
  parse: parse,
  flatten, flatten
}
