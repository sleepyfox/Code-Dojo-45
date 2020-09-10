# A first test

We'll add the implementation into the same file as the tests for the moment, this is a concept called 'TDD as if you mean it', we only create other files as the target of refactorings like extract-method.

Add a broken test for addition, important: the API for the calculator function is text based, it takes a string and returns a string. This is the basis of the REPL. With this in mind we can ignore the mechanics of the command line, textual input and printing out the answer, i.e. all I/O, and concentrate on the Evaluation part of the REPL, which is a pure function and therefore referentially transparent.

In the spirit of "fake it till you make it" we'll just return the answer, forcing us to move on to writing the next test that will expose desired behaviour.

For the next test I want to create a lexxer, otherwise called a scanner, a thing that will do lexical analysis i.e. break up the text string into a list of tokens that are separated by white-space. My next test becomes 'A lexxer should be able to split a text string into parts'.

We implement this as a simple one-liner that splits the string using a regex.

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
