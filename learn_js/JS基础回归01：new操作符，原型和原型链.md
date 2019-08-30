本篇介绍 new 操作符的背后原理以及 JS 如何依赖原型形成原型链，完成继承。

### new 操作符的本质

new 操作符置于构造函数前面，来创建一个基于该构造函数的实例。其仍属于一种模拟 Java 类行为的写法，但本质仍基于原型链的继承。

JS 是基于原型的语言，其并不具备“类”的概念，ES6 中的 class 属于一种语法糖，包装成能为 JS 开发者理解的编码形式。

这里的构造函数，既可以是 JS 已经内置的，也可以是我们自己定义的普通函数。我们知道，JS 已经为我们提供了一些内置的构造函数，可以用其创建各类数据类型的实例：

``` js
// 每一种数据类型都有对应的内置构造函数
// 注意：ES6 新增的 Symbol 类型不支持 new 新建实例
const str = new String('i am a string');
const num = new Number(123);
```

我们在实际开发中，常使用字面量形式来定义这些数据类型，两者的本质是类似的：

``` js
const str = 'i am a string';
const num = 123;
```

对于自定义的普通函数，仍然可以通过 new 操作符创建其实例：

``` JS
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name)
  };
}

const personA = new Person('Jack');
personA.sayName(); // 'Jack'
```

如同内置函数的写法，我们约定，当一个函数作为构造函数时，其首字母需要大写，这是一种约定而已，就算你使用小写，也没错，但不推荐这么做。

new 操作符的本质，仍属于基于原型的继承行为。新建的实例可以拥有其构造函数原型上的所有属性和方法。下面我们具体分析 new 操作符背后发生了什么，方便更好理解其本质。

### new 操作符背后发生了什么？

我们提到，new 操作符是在背后默默地为我们完成了一些操作，才能实现实例完整继承构造函数的效果。new 的背后其实是以下的四步操作：

1. 创建一个空的 JavaScript 对象：{}
2. 链接该对象到构造函数，也就是设置其构造函数
3. 将步骤 1 的对象作为this的上下文
4. 如果该构造函数没有返回对象，则返回 this

详细来看，第1步很好理解，我们来看第2步是如何将空对象链接到该构造函数的？

其实际的操作仍是基于原型：将空对象的 __proto__ 属性指向构造函数的 prototype 属性，`{}.__proto__ === Constructor.prototype`

我们可以通过前面的例子进行测试：

``` js
personA.__proto__ === Person.prototype // true
```

我们暂且不纠结 __proto__ 和 prototype 这两个属性，留待后面细解。

完成连接后，这个空对象已经具备了构造函数的全部属性和方法。

接下来要做的是，将该对象作为 this 的上下文，这样我们就可以通过 this 来访问该对象的所有属性和方法。

最后一步，如果构造函数明确返回了一个对象，则我们的实例目前能访问到的属性和方法来自于该对象。

``` js
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name)
  };

  return {
    name: 'Rose'
  }
}

const personA = new Person('Jack');
personA.name; // 'Rose'
```

如果返回的是其他基本类型或者没有返回，则会返回 this.

![](https://pic1.zhimg.com/80/e83bca5f1d1e6bf359d1f75727968c11_hd.jpg)

### 参考文章

1、https://github.com/creeperyang/blog/issues/9
2、https://juejin.im/post/584e1ac50ce463005c618ca2
3、https://juejin.im/post/5c7b963ae51d453eb173896e