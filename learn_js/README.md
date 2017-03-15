# 关于JavaScript
JavaScript简称JS，是一种动态的，基于原型的，解释型语言。是NetScape公司的Branden Eich于1995年开发，目的用于表单的输入验证，以减轻服务器的负担，起初名字叫做LiveScript，为了蹭Java的热度，所以改名叫做JavaScript.接着，微软看到JS在NetScape Navigator中表现特别好，也紧跟着在JS基础上推出JScript，和NetScape竞争。所以造成了天下大乱之势。所以，由欧洲计算机制造商协会（ECMA）于1997年推出了ECMAScript的新语言标准，至此，JavaScript标准统一。

事实上，JavaScript作为一门脚本语言，其一般运行在宿主环境中，而浏览器是其最常见的宿主环境。所以，我们常讲的JavaScript，除了负责语言标准的ECMAScript，还有负责处理文档内容于结构（HTML结构）的方法和接口DOM（Document Object Model）以及负责与浏览器进行交互的方法和接口BOM（Browser Object Model）两大部分，这三部分组成了我们所使用的JS所有特性。

JavaScript在Web开发领域绝对是当之无愧的王者，近些年，更是发展迅猛，其最稳定版本乃是2009年发布的ES5，而于2015年发布的ES2015，也叫ES6中新特性，开发者们能够通过Babel等转译工具的帮助下，投诸开发过程。

# JS的特性
JavaScript是一门弱类型的语言，也就是说，编译器在编译过程中无法检测其错误，所以在开发过程中十分自由。

JS有五种简单数据类型(null,undefined,string,number,boolean)以及一种复杂数据类型（Object）,ES6中新增了一个Symbol.又有一些原生的包装好的包装类型，用于构建基于这些类型的实例，有Obejct,Array,Date,RegExp,Function,Symbol,Boolean,Number,String,Math，Global，Obejct等。

JavaSript严格意义上讲，没有类的概念，而是基于原型的，两个完全独立的对象可以通过原型的关联来实现继承属性和方法，可谓是强大之际。

另外，JavaScript没有块级作用域，其只有基于函数的词法作用域。（在ES6之后，通过let命名的变量可以赋予其所在语句块作用域）

# 更多
- [JS中的数据类型与变量](JS中的数据类型和变量.md)
- [JS中的对象](关于对象.md)
