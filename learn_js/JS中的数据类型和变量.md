<style>
body {
  padding: 20px 0;
}
</style>

### JavaScript数据类型

JavaScript的数据类型分为以下几类：

五种简单数据类型：Undefined，Null，Boolean，String，Number.（在ES6中新增了一种数据类型Symbol，它的实例是唯一不可改变的。可以参考[MDN-Symbol](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)了解更多。）

一种复杂数据类型：Object.<!-- more -->

### typeof操作符

下面将分几个小短篇对其进行总结，在总结之前，先认识一个非常有用的操作符——typeof。

typeof操作符是用来检测JavaScript数据类型的操作符，它会返回上面的数据类型之一。

但是其中有一个特例，那就是Null的数据类型会返回Object，即typeof Null返回Object。

这是因为null被理解为一个空的对象引用。这就涉及到两大数据类型Null和Undefined。我们下面对其进行认识和区别。

### Null和Undefined
Null和Undefined都是只有一个值的数据类型，Undefined表示的是未经初始化的变量的值，也即
``` JavaScript
var message；
alert（message == undefined）； //true；
```
而Null则表示一个空对象指针，所以这也是typeof null返回object的原因所在。

实际上，undefined派生于null，so, <code>alert(null == undefined);</code> 也会返回true。
### 变量

#### 变量的声明
JavaScript中的变量可以通过var/const/let来声明，后两者来自ES6新标准。let和const允许声明具有块级作用域的变量（ES6之前没有块级作用域），const声明一个只读的常量，它声明的值不可以改变。

当然，也可以不用任何关键字，直接声明变量，例如`a = 13`，这个时候，变量a属于全局作用域，并且在严格模式下会报出ReferenceError的错误，所以一般不能这样声明变量。

只声明一个变量而不对其赋值，则这个变量就属于undefined类型。例如在控制台输入`var a; console.log(a);`会输出undefined.

#### 变量的标识符
变量的名字叫做标识符，关于标识符的命名，有以下的规则。
1. 必须以下划线，字母，以及美元符号($)来开头；
2. 后面的字符除了这几种类型，还可以加入数字；
3. 标识符区分大小写，也就是说，a和A代表两个变量。

所以，可以举几个变量标识符的例子，_myName,$aha,Id001等。

#### 变量的作用域
做ES6之前，只有函数才有块作用域，也就是说在函数之外声明的变量全部都是全局变量。在ES5中，在if语句外可以访问位于if语句块中通过var声明变量a。而通过let声明的变量b则无法访问到，会报出ReferenceError。
``` javascript
if (true) {
    var a = '我可以被外面访问到';
    let b = '我使if语句块出现局部作用域，外面访问不到咯';
}
console.log(a);     //输出a的值
console.log(b);     //报错
```
#### 变量声明提升
JavaScript中的变量会发生提升的现象。也就是说，在后面声明的变量，可以在前面访问到。我原本理解的变量或者函数声明的提升，相当于把出现的声明直接放到作用域的最顶端执行就可以，但是，在阅读了《你不知道的JavaScript》之后发现，事实上，这个过程并不像想象的那么简单。慢慢道来。

JavaScript在我们的理解中，一直是一门动态的解释型语言，它不需要编译，但其实，在代码被执行之前，会有极短的时间进行编译的过程，这个过程由编译器完成，编译完成之后，浏览器中的JavaScript引擎再来发动执行，也就是说，对于我们写成的代码，要先经过编译器的词法分析和解释，然后再交给引擎来运行。

> 变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量（如果之前没有声明过），然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它进行赋值。 ——《你不知道的JavaScript（上）》1.2.3 编译器有话说

从上面的叙述中，我们可以知道，一串代码的执行，会有三个角色参与：编译器、引擎和作用域。而变量的提升，则发生在编译阶段，发生在运行之前。以下面这段代码为例进行解释。
``` javascript
console.log(a);
var a = 2;
```
这段代码开始执行后，编译器会首先查找其中的所有变量声明和函数声明，将它们全部提升到作用域的最顶端，也就是var = a会被提升到最顶端，而其赋值则会留在原地不动。所以编译完成运行之前的代码是这样的：
``` javascript
var a;      //在编译阶段被提升
console.log(a);
a = 2;      //赋值操作留在原地
```
也就是说在console输出的时候，a已经被声明，但赋值还没有发生，所以console的结果是undefined.

另外，除了变量的声明，函数声明也会被提升。

这也是我们写代码的时候，为什么要把变量的声明直接放在作用域的最顶端，反正要被提升，还不如直接放在尽量顶端的位置，看起来清晰多了~

要注意的是，在ES6中，用let和const声明的变量，将不会被提升到最顶部，所以，如果上面的变量a是用let声明，则会报出ReferenceError.


### 参考资料
1. 《你不知道的JavaScript》
2. [MDN-变量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_Types#%E5%A3%B0%E6%98%8E)
