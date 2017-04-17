<style>
body {
  padding: 20px 0;
}
</style>

# Arguments Optional
创建一个计算两个参数之和的 function。如果只有一个参数，则返回一个 function，该 function 请求一个参数然后返回求和的结果。

例如，`add(2, 3)` 应该返回 5，而 `add(2)` 应该返回一个 function。调用这个有一个参数的返回的 function，返回求和的结果：`var sumTwoAnd = add(2);`

`sumTwoAnd(3)` 返回 5。

如果两个参数都不是有效的数字，则返回 `undefined`。<!-- more -->

求和的问题是常见的，这个题受参数类型和参数个数的变化而有不同的返回值，常规的解法一定是通过条件判断语句，区别各种情况，给出不同的返回值。上代码：
``` javascript
function add() {
  var sum = 0;
  //判断传入的参数数据类型，不为number返回undefined
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] !== 'number') {
      return undefined;
    }
  }

  //参数为一个以上时
  if (arguments.length > 1) {
    for (i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }
  else {
    //参数为一个时返回一个函数
    var arg1 = arguments[0];
    return sumTwoAnd;
  }

  function sumTwoAnd() {
    //再次判断新传入参数数据类型
    if (typeof arguments[0] !== 'number') {
      return undefined;
    }
    else {
      sum = arg1 + arguments[0];
      return sum;
    }
  }
}
```
同理，在FCC给出的[高级解法](https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/Algorithm-Arguments-Optional)中，我同样发现有令人惊喜的方法，整理在这里。

现在ES6标准日渐成熟，每个开发者应该拥抱新变化，让自己的代码看起来更为简洁，毕竟上面这种方法条件判断一环套一环，看起来很累啊。故而，我们运用ES6箭头函数以及三元运算符以及强大的reduce()方法来优化算法。

在这之前先来了解一下ES6中新增的一个Array方法`Array.from()`，这个方法可以将类数组对象或者可遍历对象转换成一个新的数组实例，这个方法还可以接收一个mapFun函数，可以将转换完的数组元素经过此函数处理，再返回，相当于在生成的数组上执行一次`Array.map()`方法。更多解释，查阅[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

其次是ES6中的箭头函数，它的出现让整个代码简洁优雅了不知几成呢。举个例子：`function sum(a, b) {return a + b;}`转换为箭头函数写法是这样的：`(a, b) => a + b`.

下面是完整代码：
``` javascript
function sum() {
  var args = Array.from(arguments);
  return args.some(n => typeof n !== 'number') ?
    undefined : args.length > 1 ?
      args.reduce((acc, n) => acc += n, 0) :
	    (n) => typeof n === 'number' ?
          n + args[0] : undefined;
}
```
上面的代码中，还出现了一个数组方法`Array.some()`，这个方法和前面遇到的`Array.every()`方法都会传入一个回调函数，用于检测数组元素，通过检测返回true，反之返回false，两者的区别是，前者用来测试数组中某些元素是否通过测试，也就是说，回调函数会依次对数组元素进行测试，只要有一个元素通过测试，方法立刻返回true，若全部不通过，则返回false，而后者则需要每一个元素都通过测试，才能返回true，一旦有一个元素不能通过测试，则返回false，可以说两者互相反其道而行之（通过名字也能感受到区别）。

我们看到，上面方法解决问题的思路和第一种方法大同小异，只不过通过运用`Array.from()`方法直接将函数参数转换为数组，使得后面的类型判断方便不少。另外，后面的方法反复应用三元运算符取代冗杂的if条件判断语句，使代码量大大降低，看起来更为简洁优雅，何乐而不为呢？这也是我们写代码的时候要去琢磨的：在解决问题的基础上，如何使代码更简洁，可读性更高，性能更优化（当然如何优化性能，我暂时是心有余而力不足了）。
