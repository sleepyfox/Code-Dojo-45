# A first test

I've chosen to use [Infintestimal](https://www.npmjs.com/package/@gowerstreet/infintestimal), a tiny test library that I wrote a year or two ago while working with [Sibilant.js](https://sibilant.org/) a small 'compile to JS' LISP variant. Although written for Sibilant it is equally effective in plain-old JavaScript, and has the advantage of being very small, fast, and treating tests as data. Plus, it doesn't futz around with exceptions, which are the cause of multiple issues with tracing test failures.

I'm adding the implementation into the same file as the tests for the moment, this is a concept called 'TDD as if you mean it', we only create other files as the target of a refactoring like extract-method.

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

Oops! The addition is adding two strings together, rather than interpret them as numbers. We fix this by using `parseInt()`, with the mental note that we'll probably need to fix this later in order to accommodate floating-point numbers.

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

`git checkout 1d6a28b`

I could start to refactor the `calc` function, but at this point I really want to add multiplication and decision, so I'll start with a test for multiplication. This fails in the expected way, treating the unrecognised '*' operator as the default, addition.

I remove the test (just commenting it out) and then make a quick refactor to the if statement in the calc function to swap it for a switch statement instead. Checking that the tests are all still green I now re-enable the multiplication test and implement a case for the '*' operator.

`git checkout 679903d`

It's gradually looking a bit WET (Write Everything Twice), too much duplication, but I hold off until after I'm done with division. I write a last test to cover the division case and make sure it fails before writing the implementation with a last case for the switch statement.

It bugs me that there's an edge case for an unrecognised operator here, so I add a test to make sure that an unrecognised operator '!' returns an error string (just 'Error' for now).

`git checkout 2bd4386`

This done it seems time for a little light refactoring. First let's move the implementation to it's own file, as the tests have gotten large enough to warrant a file of their own. Now we move the lexxer tests out into their own test suite. Note to self, support passing multiple suites to testRunner.

`git checkout 8722f36`

With the implementation we've got some duplication. we've got eight instances of `parseInt`, so let's extract that to two helper variables, argument1 and argument2. We run the tests after changing the first operation (subtraction), and everything is still green so I decide to do all three other operators at once, and the tests are all still green, so mission accomplished.

`git checkout c55fcbc`

Now we come to the first additional requirement, that we support floats as well as integers. The easiest way to support this is just to swap `parseInt` for `parseFloat`, but first let's add a test for adding two floats together. It fails as expected because the trailing '.1' and '.9' from the arguments in our test case get dropped by `parseInt`, and replacing it for `parseFloat` does indeed make all the tests pass again.

At this point the four instances of `.toString` offend thine eyes, so I refactored them out into a result, which is converted to a string afterwards. This has the side-effect of removing the multiple `return`s, which can be considered a smell. It does make the `switch` statement a little more ugly by enforcing the use of `break` clauses, but I don't intend on keeping that switch around forever anyway.

`git checkout 1b96d1f`

Now we introduce the last of the requirements, the need to be able to group multiple operations. At this point I decide on a new design direction, we'll use S-expressions. My choice here is that I'm gambling that it will make the separation of multiple operators easier by removing the concerns of operator precendence. The first step here is to make the calculator handle a single S-expression, which will require some changes to almost _all_ of the tests.

Before we do that, I change the lexxer to be able to handle parentheses in the input string, and to be able to split them out into their own tokens by surrounding them with whitespace and splitting as before.

Needless to say, when the tests are changed to include parens, they all break (other than the one for the unknown operator). To fix this we'll do the simplest possible thing, which is to change which tokens we look at, ignoring the first and taking the third and fourth for our two operator arguments rather than the second and third. Again, this implementation isn't great, but it won't survive long and the most important thing is to get us back to a safe place where the tests are all green again.

`git checkout a3f766d`

Now we'll start working on the issue of multiple S-expressions. Our lexxer is just fine, but our ability to parse is pretty limited. In order to support arbritrary nesting of expressions, we'll move our internal format to being a tree of lists, with each list being of the form `[operator, argument, argument]`. Before we can do that we'll just add a forward-looking test for our lexxer in order to make sure it can handle things like `(+ (* 4 5) (/ 34 2))`.

Unfortunately my first try at this doesn't work, becausee `replace` only replaces the first instance of the matched pattern if the pattern is a string. I try `replaceAll` but this is not yet supported by the most recent version of Node, so I read the MDN [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) more closely and see that I can use `replace` I just need to use a regexp for the pattern rather than a string. I remember to escape the paren, but it _still_ doesn't work, because I forgot to add `g` after the regexp to replace _all_ occurances.

`git checkout 199630b`

Now I feel ready to tackle the challenge of adding nested expressions. Looking at the code I need to do something in the `calc` function, before I get to the switch statement. Obviously I can't hardcode arguments anymore, so it seems the first step is to change the intermediate representation from a simple list of tokens to a tree of functions as we said earlier, of the form `[operator, argument, argument]`. To begin with I'll make this a refactoring, so that I can keep the tests green.

First things first, I'll move all the operator handling out into a helper function, which I'll pass a list. I'll call this function `evaluate`. I could write some tests here, but because this is a 'simple' refactoring, I'll just extract the helper function. I don't need to export `evaluate` because it is still private, and not directly tested.

With some renaming and stuff it just works. NOT! Turns out that I forgot that when I send it the tokens using `slice(1,3)` that the second argument to the slice is the first item that isn't included, doh! Fence-post error. Changing it to a 4 makes all the tests green again.

`git checkout b5bb102`

The switch statement is a bit ugly. Let's replace it with a hash lookup and just turn our operations into a lookup of simple functions.

`git checkout dc2e431`

In order to work with multiple expressions, we'll start with a test for one of the simplest possible cases `(+ 1 (+ 2 3))`, this will require us to turn a list of tokens into a tree of expressions.

That test fails as expected. First let's pull out our slice of tokens into a parse helper function that takes a list of tokens and returns a tree of expressions. Currently it'll just return the slice of tokens, because this is just a refactor. This works and all the tests are green except for our nested expression test.

It is at this point that I want to write some tests for my parser, because I certainly don't trust myself with getting a recursive expression reducer right first time! The simplest possible test that I can have at this point is just to replicate the functionality that we have currently.
