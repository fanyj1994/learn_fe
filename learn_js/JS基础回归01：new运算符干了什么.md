JS 是基于原型的语言，

new 运算符创建以个用户定义的对象类型或者具有构造函数的内置对象的实例。

new 运算符进行的操作：

1. 创建一个空的JS对象：{}
2. 链接该对象到另一个对象，也就是设置其构造函数
3. 将步骤1的对象作为this的上下文
4. 如果该函数没有返回对象，就返回this

![](https://pic1.zhimg.com/80/e83bca5f1d1e6bf359d1f75727968c11_hd.jpg)

### 参考文章

1、https://github.com/creeperyang/blog/issues/9
2、https://juejin.im/post/584e1ac50ce463005c618ca2
3、https://juejin.im/post/5c7b963ae51d453eb173896e