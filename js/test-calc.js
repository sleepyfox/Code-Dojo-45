const {is, testRunner} = require('@gowerstreet/infintestimal')
const {calc, lexx} = require('./calc')

const calc_tests =
      [['A calculator can add two numbers', () =>
        is('3', calc('+ 1 2'))
       ],
       ['A calculator can add two different numbers', () =>
        is('42', calc('+ 40 2'))
       ],
       ['A calculator can subtract two numbers', () =>
        is('42', calc('- 50 8'))
       ],
       ['A calculator can multiply two numbers', () =>
        is('42', calc('* 6 7'))
       ],
       ['A calculator can divide two numbers', () =>
        is('42', calc('/ 84 2'))
       ],
       ['A calculator should display an error for an unrecognised operator', () =>
        is('Error', calc('! 1 2'))
       ],
       ['A lexxer should be able to split a text string into parts', () =>
        is(['+', '1', '2'], lexx('+ 1 2'))
       ]]

testRunner(calc_tests)
