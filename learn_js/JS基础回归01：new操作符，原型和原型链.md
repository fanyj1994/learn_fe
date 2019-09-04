本篇介绍 new 操作符的背后原理以及 JS 如何依赖原型形成原型链，完成继承。

### new 操作符的本质

new 操作符置于构造函数前面，来创建一个基于该构造函数的实例。其仍属于一种模拟 Java 类行为的写法，但它的本质是基于原型链的继承。

JS 是基于原型的语言，并不具备“类”的概念，ES6 中的 class 属于一种语法糖，能够让开发者更好理解。

这里的构造函数，既可以是 JS 已经内置的函数(String, Boolean, Object等)，也可以是我们自己定义的普通函数。我们知道，JS 自身提供了一些内置的构造函数，可以用其创建各类数据类型的实例：

``` js
// 每一种数据类型都有对应的内置构造函数
// 注意：ES6 新增的 Symbol 类型不支持 new 新建实例
const str = new String('i am a string');
const num = new Number(123);
```

我们在实际开发中，常使用字面量形式来定义这些数据类型，两者的本质是类似的（但推荐使用后者）：

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

如同内置函数的写法，当一个普通函数作为构造函数时，其首字母需要大写，这只是一种写法上的约定，就算你使用小写，也没错，但不推荐这么做。

如上所述，new 操作符的本质，仍属于基于原型的继承行为。新建的实例拥有其构造函数原型上的所有属性和方法。下面我们具体分析 new 操作符背后发生了什么，方便更好理解其本质。

### new 操作符背后发生了什么？

我们提到，new 操作符是在背后默默地为我们完成了一些操作，才能实现实例完整继承构造函数的效果。new 的背后其实是以下的四步操作：

1. 创建一个空的 JavaScript 对象：{}
2. 链接该对象和构造函数，也就是设置其原型
3. 将步骤 1 的对象作为this的上下文
4. 如果该构造函数没有返回对象，则返回 this

详细来看，第1步很好理解，我们来看第2步是如何将空对象链接到该构造函数的？

其实际的操作仍是基于原型：将空对象的 __proto__ 属性指向构造函数的 prototype 属性，`{}.__proto__ === Constructor.prototype`

我们可以通过前面的例子进行测试：

``` js
personA.__proto__ === Person.prototype // true
```

我们暂且不纠结 __proto__ 和 prototype 这两个属性，留待后面细解，你可以将它理解为两个插口，两个没有关系的对象，因为它们相爱走到了一起。

完成连接后，这个空对象已经具备了构造函数的全部属性和方法。

接下来要做的是，将该对象作为 this 的上下文，这样我们就可以通过 this 来访问该对象的所有属性和方法。

最后一步，如果构造函数明确返回了一个对象，则我们的实例目前能访问到的属性和方法来自于该对象。

``` js
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name)
  };

  // 返回一个对象
  return {
    name: 'Rose'
  }
}

const personA = new Person('Jack');
personA.name; // 'Rose'
```

如果没有返回任何值，则会返回 this.

若是返回一个原始类型的值，实例会忽视它，仍然拿到this.

``` js
function Person(name) {
  this.name = name;
  this.sayName = function () {
    console.log(this.name)
  };

  return 'my name is Bob';
}

const personA = new Person('Jack');
console.log(personA)
```

现在我们对于 new 的背后发生了什么，已经很清楚，就是新建一个对象，将该对象通过原型与构造函数相连，拥有构造函数返回（this 或者 显示返回的对象）的全部方法和属性。

构造函数与普通函数的区别是：

1. 前者首字母大写，但不是必须
2. 普通函数前面加上 `new`，就是构造函数，会返回一个创建的对象，去掉 `new`，就是普通函数，会得到其 return 的值。

我们也许会对上面第二步的操作感到疑惑，`__proto__`和`prototype`的区别和联系是什么？原型链又是怎么实现的？

### 原型、原型链及继承

首先，继承很好理解，许多语言都有这个功能，其基本的目的是，完成功能的复用。一般来讲，继承指的是面向对象的继承，在 Java 中，通过类实现继承，但在 JS 中，是没有类这个概念的，它拥有一套独立而强大的继承机制：基于原型链的继承，原型链又是基于原型这个特性实现的。

#### __proto__、prototype 和 constructor

我们先来理清这三个概念。

- `__proto__`：每一个对象都拥有一个隐式的属性`__proto__`，指向其构造函数的原型对象
- `prototype`：**只有函数才会拥有的属性**，指向函数的原型对象
- `constructor`: 每一个原型对象都拥有这个属性，指向该对象的构造函数。

首先明确以下事实：

1. JS 中的所有对象一定都有一个原型，并且继承了来自原型的所有属性和方法，而对象找到这个原型的路径就是 `obj.__proto__`。
2. 不是所有的对象都会有 `prototype` 属性，只有函数才有：`{x: 1}.prototype` 的值就为 undefined.

有点绕，请仔细看看这张经典的图：

![](https://pic1.zhimg.com/80/e83bca5f1d1e6bf359d1f75727968c11_hd.jpg)

我们跟着这张图和上面三句话的指引，来看看下面的简单例子：

``` js
function Person(name) {
  this.name = name;
}

// sayName方法属于 Person 这个构造函数的原型对象
Person.prototype.sayName = function () {
  return `Hello, I am ${this.name}`;
}

const p1 = new Person('Alice')

console.log(p1.__proto__ === Person.prototype) // true
console.log(Person.prototype.constructor === Person) // true
console.log(p1.name) // Alice
console.log(p1.sayName()) // Hello, I am Alice
```

从这个简单例子中，我们可以看到，p1既拥有了 Person 的属性，也拥有了 Person 原型对象的方法。这样，三者就完成了一次继承，而这个方式，就是通过原型链实现。

这条链从下游到上游依次是：p1 → Person → Person.prototype.（实际上，这个链条上游更长，Person.prototype仍然拥有自己的原型，一直到 Object.prototype）

所以，我们的 new 操作符仍然是一种继承行为，但其仍属于打造原型链的过程。

在这条链上面，上游的方法和属性被下游的实例所共有，同时，下游的对象可以自由定制自己的属性和方法，当上下游拥有同名的属性和方法时，就会出现“属性遮蔽”的情况：

``` JS
function Person(name) {
  this.name = name;
  this.sayName = function () {
    return 'Hahaha, I am Bob.';
  }
}

// sayName方法属于 Person 这个构造函数的原型对象
Person.prototype.sayName = function () {
  return `Hello, I am ${this.name}`;
}

const p1 = new Person('Alice')
console.log(p1.sayName()) // "Hahaha, I am Bob."
```

那么，为什么会出现“属性遮蔽”的行为，这涉及到原型链的工作方式。

我们提到，可以把原型链比作一个上下游的关系，这个上游可达对象的基本构造函数 Object 的原型对象：`Object.prototype`，下游可以以多种方式进行拓展，new 操作符正是其中一种。

当我们访问一个下游节点的属性时，首先会**优先从当前节点开始查询**，在上面的例子中，p1 本身没有一个 sayName 方法，所以，它会沿着原型链，找到它的构造函数 Person。

Person 内部定义了 sayName 方法，所有就返回了。如果这里也没有找到，就会继续向上查找，找到其原型对象，也就是 Person.prototype，仍然未找到，继续向上查找，一直到最后的 Object.prototype.这个对象是 null，所以到此为止。

也就是说，`Object.prototype` 是对象原型链的最上游，发源地，下游的实例从这里继承了 Object 的所有实例和方法，例如 `toSting`、`hasOwnProperty`，感兴趣的同学可以在控制台打印看看。

我们可以看到，正是通过 `__proto__` 以及 `prototype` 这两个属性通力合作，JS 才能实现继承，打造原型链。

#### instanceof 操作符的工作机制

看看 MDN 上对于 `instanceof` 的定义：

> The instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.
> `instanceof` 操作符检测构造函数的 prototype 属性出否出现在一个对象原型链的任何位置。

换句话说：检测一个对象的原型是否出现在另一个对象的原型链上游。按前面的例子进行举例：

``` js
console.log(p1 instanceof Person) // true
console.log(p1 instanceof Object) // true
console.log(Person instanceof Object) // true
```

那么，可以思考，`instanceof` 是如何工作的呢？

**沿着左边对象的原型链向上查询，一直到最顶部，能找到右边对象，返回 true，反之返回 false**。

也就是判断 `left.__proto__ === right.prototype`，如果 `false`，沿着原型链，继续判断：

`left.__proto__.__proto__ === right`，一直到 Object.prototype.

### 动手实现一个 new 操作符

我们先回顾 `new` 操作符背后做的工作：

1. 创建一个空的 JavaScript 对象：{}
2. 链接该对象和构造函数，也就是设置其原型
3. 将步骤 1 的对象作为this的上下文
4. 如果该构造函数没有返回对象，则返回 this

明确了它背后发生的事情，现在我们动手亲自实现一个 `new`:

``` js
function anotherNew(constructorFunc, ...args) {
  // 判断传入的值是否为构造函数
  if (typeof constructorFunc !== 'function') {
    return `${constructorFunc} is not a constructor`;
  }

  let obj = {}; // 1.新建一个空对象
  obj.__proto__ = constructorFunc.prototype; // 原型链接
  let result = constructorFunc.apply(obj, [...args]); // 绑定 this,将参数与传入构造函数绑定
  return result instanceof Object ? result : obj; // 判断构造函数是否为对象
}
```

我们来测试一下是否能否工作：

``` js
function Person(name) {
  this.name = name;
  this.sayName = function () {
    return 'Hahaha, I am Bob.';
  }
}

const person1 = anotherNew(Person, 'Jack');
console.log(person1.name) // "Jack"
console.log(person1.sayName) // "Hahaha, I am Bob."
console.log(person1.__proto__ === Person.prototype) // true
```

到这里，我们就实现了一个属于自己的 new 操作符。

### 总结

这篇文章从 `new` 操作符出发，了解了它的本质，是 JS 为了模仿类的行为，包装而成的一个功能，基本来说，其是通过新建一个对象，并将该对象的原型设置为构造函数，使其具备构造函数的全部方法和属性，形成一个基于原型链的继承。同时，对象还可以拥有自己的属性和方法，在具体访问时，优先访问位于原型链下游的属性。

最后我们根据掌握的原理，动手实现了一个 `new` 操作符。

这是我 JS 基础回归第一篇，谬误之处，请大家指教。

### 参考文章

1. https://github.com/creeperyang/blog/issues/9
2. https://juejin.im/post/584e1ac50ce463005c618ca2
3. https://juejin.im/post/5c7b963ae51d453eb173896e
4. https://juejin.im/post/58f94c9bb123db411953691b
5. https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain