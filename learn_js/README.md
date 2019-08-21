# 关于 JavaScript
JavaScript 简称 JS，是一种动态的，基于原型的，解释型语言。是 NetScape 公司的 Branden Eich 于 1995 年开发，目的用于表单的输入验证，以减轻服务器的负担，起初名字叫做 LiveScript，为了蹭 Java 的热度，所以改名叫做 JavaScript. 接着，微软看到 JS 在 NetScape Navigator 中表现特别好，也紧跟着在 JS 基础上推出 JScript，和 NetScape 竞争。所以造成了天下大乱之势。所以，由欧洲计算机制造商协会（ECMA）于 1997 年推出了 ECMAScript 的新语言标准，至此， JavaScript 标准统一。

事实上，JavaScript 作为一门脚本语言，其一般运行在宿主环境中，而浏览器是其最常见的宿主环境。所以，我们常讲的 JavaScript，除了负责语言标准的 ECMAScript，还有负责处理文档内容于结构（HTML 结构）的方法和接口 DOM（Document Object Model）以及负责与浏览器进行交互的方法和接口 BOM（Browser Object Model）两大部分，这三部分组成了我们所使用的JS所有特性。

JavaScript 在 Web 开发领域绝对是当之无愧的王者，近些年，更是发展迅猛，其最稳定版本乃是2009年发布的 ES5，而于 2015 年发布的 ES2015，也叫 ES6 中新特性，开发者们能够通过 Babel 等转译工具的帮助下，投诸开发过程。

# JS的特性
JavaScript 是一门弱类型的语言，也就是说，编译器在编译过程中无法检测其错误，所以在开发过程中十分自由。

JS 有五种简单数据类型(null,undefined,string,number,boolean)以及一种复杂数据类型（Object）,ES6 中新增了一个 Symbol.又有一些原生的包装好的包装类型，用于构建基于这些类型的实例，有 Obejct,Array,Date,RegExp,Function,Symbol,Boolean,Number,String,Math，Global，Obejct 等。

JavaSript 严格意义上讲，没有类的概念，而是基于原型的，两个完全独立的对象可以通过原型的关联来实现继承属性和方法，可谓是强大之际。

另外，JavaScript 没有块级作用域，其只有基于函数的词法作用域。（在 ES6 之后，通过 let 命名的变量可以赋予其所在语句块作用域）

# 更多
- [JS中的数据类型与变量](JS 中的数据类型和变量.md)
- [JS中的对象](关于对象.md)
- [JS中的类(Classes)](JS 中的类.md)

# FreeCodeCamp 题
- [Sum All Numbers in a Range](FreeCodeCamp/Sum-All-Numbers-in-a-Range.md)
- [Sum All Odd Fibonacci Numbers](FreeCodeCamp/Sum-All-Odd-Fibonacci-Numbers.md)
- [Sum All Primes](FreeCodeCamp/Sum-All-Primes.md)
- [Smallest Common Multiple](FreeCodeCamp/Smallest-Common-Multiple.md)

- [Drop it](FreeCodeCamp/Drop-it.md)
- [Every Be True](FreeCodeCamp/Everything-Be-True.md)
- [Arguments Optional](FreeCodeCamp/Arguments-Optional.md)
- [Symmetric Defference](FreeCodeCamp/symmetric-difference.md)
- [pairwise](FreeCodeCamp/Pairwise.md)
- [Where Art Thou](FreeCodeCamp/Where-art-thou.md)

# CodeWar题
- [IQ test](codewar/IQtest.md)
- [Two to one](codewar/Two-to-one.md)
- [Your order please](codewar/Your-order-please.md)
- [Dubstep](codewar/DubStep.md)

# 一些问题

1. 加不加分号：在[ ] ( ) + - 正则开始的斜杠开头时，不会自动插入分号
