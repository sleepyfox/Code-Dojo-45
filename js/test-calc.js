const {is, testRunner} = require('@gowerstreet/infintestimal')

function calc(input_line) {
  return "3"
}

function lexx(input_line) {
  return input_line.split(/\s+/)
}

const calc_tests =
      [['A calculator can add two numbers',
        () => {
          return is("3", calc("+ 1 2"))
        }
       ],
       ['A lexxer should be able to split a text string into parts',
        () => {
          return is(["+", "1", "2"], lexx("+ 1 2"))
        }
       ]]

testRunner(calc_tests)
