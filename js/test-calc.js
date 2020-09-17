const {is, testRunner} = require('@gowerstreet/infintestimal')
const {calc, parse, lexx, flatten} = require('./calc')

const calc_tests =
      [['A calculator can add two numbers', () =>
        is('3', calc('(+ 1 2)'))
       ],
       ['A calculator can add two different numbers', () =>
        is('42', calc('(+ 40 2)'))
       ],
       ['A calculator can subtract two numbers', () =>
        is('42', calc('(- 50 8)'))
       ],
       ['A calculator can multiply two numbers', () =>
        is('42', calc('(* 6 7)'))
       ],
       ['A calculator can divide two numbers', () =>
        is('42', calc('(/ 84 2)'))
       ],
       ['A calculator will display an error for an unrecognised operator', () =>
        is('Error', calc('(! 1 2)'))
       ],
       ['A calculator can add two floating point numbers', () =>
        is('42', calc('(+ 39.1 2.9)'))
       ],
       ['A calculator can handle a nested expression', () =>
        is('6', calc('(+ 1 (+ 2 3))'))
       ]]
       // ['A calculator can handle multiple nested exps', () =>
       //  is('21', calc('(/ (* 6 7) (- 3 1))'))
       // ]]

const lexx_tests =
       [['A lexxer should be able to split a text string into parts', () =>
         is(['(', '+', '1', '2', ')'], lexx('(+ 1 2)'))
        ],
        ['A lexxer can handle nested expressions', () =>
         is(['(', '+', '(', '*', '4', '5', ')', '(', '/', '34', '2', ')', ')'],
            lexx('(+ (* 4 5) (/ 34 2))'))
        ]]

const parser_tests =
      [['A parser can turn tokens into a AST', () => {
         const result = parse(['(', '+', '1', '2', ')'])
         return (is(true, Array.isArray(result)) &&
                 is('+', result[0]) &&
                 is(1, result[1]) &&
                 is(2, result[2]))
       }]]
       // ['', () => {
       //   // (+ (+ 1 2) (+ 4 5))
       //   const a = ['(', '+',
       //              '(', '+', '1', '2', ')',
       //              '(', '+', '4', '5', ')', ')'],
       //         result = parse(a),
       //         expected = ['+', ['+', 1, 2], ['+', 4, 5]]
       //   return is(expected, result)
       // }]]

const flatten_tests =
      [['Flattening an ordinary expression has no change', () =>
        is(['+', 2, 3], ['+', 2, 3].map(flatten))
       ],
       ['Flattening a nested expression evaluates the nest', () =>
        is(['+', 1, 5], ['+', 1, ['+', 2, 3]].map(flatten))
       ]]

testRunner(calc_tests)
testRunner(lexx_tests)
testRunner(parser_tests)
testRunner(flatten_tests)
