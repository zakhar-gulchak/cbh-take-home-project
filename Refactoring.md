# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

### Did few steps to refactor the code:
1. Added a try/catch block to the original code to handle the error thrown by JSON.stringify 
when it encounters a BigInt or a circular reference.
2. Added implicit default value to return variable `candidate`.
3. Moved candidate.length checking to exact place where it is actually needed. 
Since createHash function currently producing string which length is 128.
4. Moved stringify of event.partitionKey object to the place where it is actually needed.
5. Wrote tests to cover all the cases. Checked on the original code that all tests are passing.

Summarizing these steps i've decreased if/else nesting level, same as amount of conditions branching.
And added more clarity by setting default value.

_All these steps are made to make code more readable and easier to understand.
You can even compare the number of lines of code in the original code and in the refactored code.
And you will see that the refactored code is shorter (not counting try/catch block)._
