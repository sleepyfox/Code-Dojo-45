const {is, testRunner} = require('@gowerstreet/infintestimal')

function calc(input_line) {
  tokens = lexx(input_line)
  if (tokens[0] == "-") {
    return (parseInt(tokens[1]) - parseInt(tokens[2])).toString()
  } else {
    return (parseInt(tokens[1]) + parseInt(tokens[2])).toString()
  }
}

function lexx(input_line) {
  return input_line.split(/\s+/)
}

const calc_tests =
      [['A calculator can add two numbers', () =>
        is("3", calc("+ 1 2"))
       ],
       ['A calculator can add two different numbers', () =>
        is("42", calc("+ 40 2"))
       ],
       ['A calculator can subtract two numbers', () =>
        is("42", calc("- 50 8"))
       ],
       ['A lexxer should be able to split a text string into parts', () =>
        is(["+", "1", "2"], lexx("+ 1 2"))
       ]]

testRunner(calc_tests)
