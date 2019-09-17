### 认识 this

this 是 JS 中的一个关键字，有了函数就有了 this，对于 this，最直观的认识莫过于以下两种：

1. 它指向函数自身
2. 它指向函数的词法作用域

这两种认识都是错误的。this 到底指向哪里，取决于**函数在哪里被调用**。

怎么讲？

函数被创建的时候，this 是不存在的，this 在函数被调用时动态绑定。它代表了当前函数的执行上下文。

### this 到底指向哪里

this 指向哪里，有一个最简单粗暴的判定方法：

**它指向最后调用函数的对象。**

怎么确定调用函数的对象？

找到函数被调用的位置，调用的位置就是调用栈最顶部的位置。

我们举例来看：

``` JS
const name = 'Alice'
function sayName() {
  const name = 'Bob'
  return this.name
}

const obj = {
  name: 'Tom',
  sayName: function() {
    return this.name
  }
}

sayName()
obj.sayName()
```

我们首先看直接调用sayName的时候，它的调用位置是全局环境，也就是 window，这个调用等价于 `window.sayName()`，所以，this 指向 window，这时候的 `this.name` 就是 `window.name`，所以，返回了全局环境中的 name 为 Alice。

在第二种调用情况中，我们可以清晰地看到最后调用函数的对象是 `obj`，所以 `this` 指的是 `obj`，`this.name` 指的是 `obj.name`，也就是 Tom。

下面，我们来具体细看不同情况下的 this 指向。

#### 1. 默认绑定

默认绑定，就是上面例子中的第一种调用情况，直接的函数调用，前面没有任何 `.` 操作。此时，this 指向的是全局对象，在浏览器中，正是 window。

要注意的是，在严格模式下，this 无法绑定全局对象，它会绑定为 undefined.

#### 2. 隐式绑定

#### 3. 显示绑定

#### 4. new 绑定

#### 5. 箭头函数中的 this

#### 6. 整体的判断思路

### 改变 this 指向的几种方法