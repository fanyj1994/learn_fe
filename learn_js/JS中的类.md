ES6中引入的类是基于 JavaScript 原型继承的一种语法糖，并非是在 JS 中加入了真正面向对象的继承方式，而是以一种更为简洁的写法来实现创建对象以及其之间的继承关系。

# 创建类
类实际上是一种特殊的函数，就像传统函数的定义一样，同样可以通过**类声明**和**类表达式**来定义。

### 类声明
类声明就是在 class 关键字后面加上类的名字就可以。

``` javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age  = age;
    }
}
```

我们知道
