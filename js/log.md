# A first test

I've chosen to use [Infintestimal](https://www.npmjs.com/package/@gowerstreet/infintestimal), a tiny test library that I wrote a year or two ago while working with [Sibilant.js](https://sibilant.org/) a small 'compile to JS' LISP varient. Although written for Sibilant it is equally effective in plain-old JavaScript, and has the advantage of being very small, fast, and treating tests as data. Plus, it doesn't futz around with exceptions, which are the cause of multiple issues with tracing test failures.

I'm adding the implementation into the same file as the tests for the moment, this is a concept called 'TDD as if you mean it', we only create other files as the target of refactorings like extract-method.

Add a broken test for addition, important: the API for the calculator function is text based, it takes a string and returns a string. This is the basis of the REPL. With this in mind we can ignore the mechanics of the command line, textual input and printing out the answer, i.e. all I/O, and concentrate on the Evaluation part of the REPL, which is a pure function and therefore referentially transparent.

I'll add a commit SHA with a git checkout command in the text here so that you can follow along with the repo history, each one will be the result of implementing what you've read up to the point in the text. At this point we have a broken example test from the main branch.

`git checkout f03cdc9`

In the spirit of "fake it till you make it" we'll just return the answer, forcing us to move on to writing the next test that will expose desired behaviour.

For the next test I want to create a lexxer, otherwise called a scanner, a thing that will do lexical analysis i.e. break up the text string into a list of tokens that are separated by white-space. My next test becomes 'A lexxer should be able to split a text string into parts'.

We implement this as a simple one-liner that splits the string using a regex.

`git checkout c3b8a34`

Where to go next? It seems reasonable at this point to refactor the original top-level function in order to expose real behaviour rather than the fake hard-coded response, but we shouldn't do this without writing a test, so I'll add a simple test that will break the fake implementation 'A calculator can add two different numbers'. This fails with "expected 5 but got 3" forcing us to fix the `calc` function.

We can do this by assuming that we're always doing addition, and just extracting the two numbers to add up from the lexxed list.

The simple implementation:

>   tokens = lexx(input_line)
>   return (tokens[1] + tokens[2])

fails with:

> Running tests...
>
> ✘ A calculator can add two numbers
>   expected 3 but got 12
> ✘ A calculator can add two different numbers
>   expected 5 but got 32
> ✔ A lexxer should be able to split a text string into parts

Oops! The addittion is adding two strings together, rather than interpret them as numbers. We fix this by using `parseInt()`, with the mental note that we'll probably need to fix this later in order to accomodate floating-point numbers.

> expected 3 but got 3

Oops again! We've got the right answer, but the assertion is expecting a string and we're giving it a number! A quick `.toString()` fixes this, but leaves a bad taste in my mouth as the code now looks quite ugly. Note to self: must refactor later.

`git checkout ed11dc1`

A slight tidy up to the tests to use the one-line arrow function form.

`git checkout aec2821`

we move on to our next test: 'A calculator can subtract two numbers'. This will force us to fix the implicit assumption in the top-level calc function around the operation being addition.

> ✘ A calculator can subtract two numbers
>   expected 42 but got 58

Obviously it has added the two numbers together instead of subtracting, so we need to deal with switching operator. At the moment we'll just put an if statement in there, and assume that if it isn't addition then it must be subtraction. Hacky, but 'fake it till you make it'. This fixes the failing tests, now all are green.

`git checkout ea96757`

At this point a quick refactor to make my use of quotes consistent. I'm going with single quotes because you don't need to press the shift key in order to type them, save with RSA and all that.

