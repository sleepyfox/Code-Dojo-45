const {is, testRunner} = require('@gowerstreet/infintestimal')

function calc(input_line) {
  return "output line"
}

const calc_tests =
      [['A calculator can add two numbers',
        () => {
          return is("3", calc("+ 1 2"))
        }
       ]]

testRunner(calc_tests)
