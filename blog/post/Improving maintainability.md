# Forewords

**Not everybody will agree** with the content of this article and **that is alright**: it is extremely **opiniated**. However, the **tricks** that are given here are the ones I use almost **every day in my coding** and they tend to **lower** the only **valid measurement of code quality** :

![WTF per minutes](Improving%20Maintainability/wtfperminutes.jpg)

The examples and tools are based on the **JavaScript** language.

# What is maintainability ?

In the **software industry**, "write and forget" does **not** happen. A software is a **living beast** and it must be **fed regularly**. Whether  you have to **fix bugs** or **add new features**, you will come back to the **source code** very often.

When it takes **hours to understand** what the code does or you need to **rewrite large chunks** to add a new behavior, there is a problem.

To put it in a nutshell, maintainability implies two main **qualities**:
* readability
* ease of modification
 
Obviously, it starts with a **good design**. Since anyone can already find **lots of articles** and [**documented principles**](https://en.wikipedia.org/wiki/Software_design) on the web ([desgin patterns](https://en.wikipedia.org/wiki/Software_design_pattern), [SOLID](https://en.wikipedia.org/wiki/SOLID), [KISS](https://en.wikipedia.org/wiki/KISS_principle), [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ...), this article is not about design or architecture.

The focus is rather set on **writing code**.

## Static validation of maintainability

From that point of view, **maintainability first echoes to best practices** such as :
* consistent [formatting](https://en.wikipedia.org/wiki/Indentation_style)
* [naming convention](https://en.wikipedia.org/wiki/Naming_convention_%28programming%29)
* avoid [deep nesting](https://en.wikibooks.org/wiki/Computer_Programming/Coding_Style/Minimize_nesting)
* reduce [code complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity)
* ...

All of these points can be **defined and verified** with a [linter](https://gomakethings.com/javascript-linters/).

If your **project definition** does not include a **static validation step** leveraging tools like [ESLint](https://eslint.org/) or [StandardJS](https://standardjs.com/), you are missing the **opportunity to detect upfront all the potiental problems** of your code base.

Any doubt ? Just look at the [eslint rules database](https://eslint.org/docs/rules/). Each rule is **heavily documented** with advices and examples. They are **constantly revised** and they convey the **knowledge of many developers** *(more than [700 contributors](https://github.com/eslint/eslint/graphs/contributors) to the project)*.

Two examples in particular :

* [`no-cond-assign`](https://eslint.org/docs/rules/no-cond-assign) : it controls the use of assignment inside a condition. As the rule says :

> There are valid reasons to use assignment operators in conditional statements. However, it can be difficult to tell whether a specific assignment was intentional.

* [`no-async-promise-executor`](https://eslint.org/docs/rules/no-async-promise-executor) : it prevents the use of async functions as the promise executor. The rule explains : 

> The executor function can also be an async function. However, this is usually a mistake, for a few reasons:
> * If an async executor function throws an error, the error will be lost and won't cause the newly-constructed Promise to reject. This could make it difficult to debug and handle some errors.
> * If a Promise executor function is using await, this is usually a sign that it is not actually necessary to use the new Promise constructor, or the scope of the new Promise constructor can be reduced.

Some rules also offers the possibility to **fix automatically** the spotted issues *(in particular  the formatting)*. This is a great benefit for [**lazy developers** like me](https://www.linkedin.com/pulse/lazy-arnaud-buchholz/).

## Runtime validation of maintainability

**Every** line of code should be tested and, actually, the tests may even be written [**before** the production code](https://en.wikipedia.org/wiki/Test-driven_development).

**Testing the code** is associated to maintainability for several reasons :
* Tests **validate and secure the code behavior**. It means that if you need to work on it, it makes sure the modification will not **break** it.
* Tests also **document the code**. The best way to understand a class or a method is to check the tests and discover what are the **use cases**.

## Developer intention

Another aspect that relates to the topic but that is more **subtle** is everything that clarifies the **developer intention**.

For instance, declaring a variable with `const` has a different meaning than declaring it with `let`. 

> However, in JavaScript, the `const` keyword does not mean that the value will not change. Only the association between the variable and the value is constant.

Another example is callback functions. Most [Node.js](https://nodejs.org/) functions are using callbacks to be notified of the method completion. Most of them are asynchronous but it is not a requirement !

On the other hand, declaring an async function or returning a Promise means that the result is transmitted asynchronously.

A good way to validate the developer intention is to practice **code review** *(an implementation of the [four eyes principle](https://www.openriskmanual.org/wiki/Four_Eyes_Principle))*. It is recommended as it fosters maintainability. Not only this will guarantee that the above practices are respected but it also enables knowledge sharing inside a team.

## 

Maintainability, and in particular code complexity, has been studied in depth. Here are some papers :
* [A Complexity Measure](http://www.literateprogramming.com/mccabe.pdf), by Thomas J McCabe.
* [Cyclomatic Complexity Density and Software Maintenance Productivity](http://www.pitt.edu/~ckemerer/CK%20research%20papers/CyclomaticComplexityDensity_GillKemerer91.pdf), by Geoffrey K. Gill and Chris F. Kemerer.
* [Resolving the Mysteries of the Halstead Measures](http://horst-zuse.homepage.t-online.de/z-halstead-final-05-1.pdf), by Horst Zuse.

A metric has also been [defined](https://docs.microsoft.com/en-us/archive/blogs/codeanalysis/maintainability-index-range-and-meaning) to quantify how much the code is maintanable.

# An example project

The [GPF-JS libray](https://github.com/ArnaudBuchholz/gpf-js) is an **experiment** started almost 5 years ago. It contains **helpers and concepts** designed to be **compatible** with multiple JavaScript hosts *(browsers, nodejs but also less typical such as Microsoft cscript, Nashorn & Rhino)*. The **validation process** includes a linter as well as code **complexity measurement** automated with [plato](https://www.npmjs.com/package/plato). The goal is to keep the ratio [above 80](https://arnaudbuchholz.github.io/gpf/plato/index.html).

# Coding rules

Here ar some coding rules 

## Never use more than 3 parameters

When the call implies more than 3 parameters, it quickly becomes unreadabml.

For instance:

function log (level, message, details, medium) {
    /* ... */
}

there are several ways to tackle this example :
=> Create specialized method with one of the parameter

group less used parameters in an object parameter



log.error (message, details, medium)

log.info





If the method really needs more than 3 parameters, an object parameter is introduced. This way, the values are documented.

For instance :

function ()

## Limit the use of boolean parameters

Consider the following code

function save (medium, notify) {

}

notify is a boolean parameter that will throw an event to ...

upon usage, this gives :

save ("./anyfile.txt", true)
or save ("./anyfile", false)

how do you remember the meaning of this boolean ?

would it be better to have two methods

save (medium)

saveAndNotify (medium)


## Limit the number of instructions

Did you ever see a method that contains hundreds lines of code ? you can quickly get lost by what it does

Splitting this method into smaller methods has two values: it increases isolation & modularity and the function name is a way to recall what it does

## Limit the code complexity

if / else if / esle if / esle if ...

### Use dictionaries

### Use regular expressions
examples

if (value === "a" || value === "b")

if /a|b/.exec(value)

## Asynchronous code

If you don't use Promises, you should. I don't even what to explain why but here are some good references

