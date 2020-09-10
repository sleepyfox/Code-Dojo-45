# A first test

We'll add the implementation into the same file as the tests for the moment, this is a concept called 'TDD as if you mean it', we only create other files as the target of refactorings like extract-method.

Add a broken test for addition, important: the API for the calculator function is text based, it takes a string and returns a string. This is the basis of the REPL. With this in mind we can ignore the mechanics of the command line, textual input and printing out the answer, i.e. all I/O, and concentrate on the Evaluation part of the REPL, which is a pure function and therefore referentially transparent.

In the spirit of "fake it till you make it" we'll just return the answer, forcing us to move on to writing the next test that will expose desired behaviour.

For the next test I want to create a lexxer, otherwise called a scanner, a thing that will do lexical analysis i.e. break up the text string into a list of tokens that are separated by white-space. My next test becomes 'A lexxer should be able to split a text string into parts'.

We implement this as a simple one-liner that splits the string using a regex.

Where to go next?
