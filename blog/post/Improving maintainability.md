# Forewords

**Not everybody will agree** with the content of this article and **that is alright**: it is extremely **opiniated**. I will **never pretend** that I **know better** nor that I **know everything**. However, the **tricks** that are given here are the ones I use almost **every day in my coding** and they tend to **reduce** the only **valid measurement of code quality** :

![WTF per minutes](Improving%20Maintainability/wtfperminutes.jpg)

# What is maintainability ?

In the **software industry**, "write and forget" does **not** happen. A software is a **living beast** and it must be **fed regularly**. Whether  you have to **fix bugs** or **add new features**, you will come back to the **source code** very often.

When it takes **hours to understand** what the code does or you need to **rewrite large chunks** to add a new behavior, there is a problem.

To put it in a nutshell, maintainability implies two main **qualities**:
* readability
* ease of modification
 
Obviously, it all start by a **good design** : there are **tons of articles** and [principles****](https://en.wikipedia.org/wiki/Software_design) (like [SOLID](https://en.wikipedia.org/wiki/SOLID), [KISS](https://en.wikipedia.org/wiki/KISS_principle), [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) ...) on the web already.

But if you go down to code writing, it translates to best practices such as :
* naming convention
* isolation
* documentation (including testing)

> There are multiple values to testing. It validates and secures the code behavior but it also documents it.

Maintainability, and in particular code complexity, has been studied in depth. Here are some papers :

* [A Complexity Measure](http://www.literateprogramming.com/mccabe.pdf), by Thomas J McCabe.
* [Cyclomatic Complexity Density and Software Maintenance Productivity](http://www.pitt.edu/~ckemerer/CK%20research%20papers/CyclomaticComplexityDensity_GillKemerer91.pdf), by Geoffrey K. Gill and Chris F. Kemerer.
* [Resolving the Mysteries of the Halstead Measures](http://horst-zuse.homepage.t-online.de/z-halstead-final-05-1.pdf), by Horst Zuse.
