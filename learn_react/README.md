<style>
body {
  padding: 20px 0;
}
</style>

# 什么是React
React是Facebook开发的前端View层框架，也就是说它专注于用户界面呈现。

# 它有什么特性
1. 组件化。组件化使得前端业务逻辑更清晰，维护便捷，也就是说，整个Web应用可以被封装成一个个组件，每个组件是完全独立的个体，组件有自己的样式，逻辑，结构，通过模块依赖的方式，形成一个组件树，这个组件树构成了页面。

![组件化示意图](https://github.com/fouber/blog/raw/master/201508/assets/modular_2.png)（图片来自https://github.com/fouber/blog/issues/10）

2. 状态管理。React通过state和props实现状态管理，state属于自身状态，props属于外来属性。通过这两者来实现组件状态的更新。

3. Virtual DOM.React采用虚拟DOM的渲染方式，据说这样的渲染方式大大减少DOM更新，从而大大提升页面性能（具体怎么实现，并不懂）

### 组件化

在互联网时代，Web应用不再是简单的信息呈现载体，其丰富的交互和逻辑使得Web应用的复杂度提高了不止一个当量级。这对于Web开发人员来说，Web开发不再是简单的页面呈现与动画效果的实现，其业务逻辑与模块的串联依赖变得十分重要，可以想到，大型的电子商务网站，视频网站，我们常用的社交网站由于其业务逻辑的复杂度，以及大规模的用户访问带来的性能问题，意味着开发和维护的难度也日益提升，这也是Web前端开发人员甚至全栈开发越来越重要的原因。

而React组件化的思路，其实在今天的前端工程化的时代，让人耳目一新。组件化让业务逻辑更清晰，维护更便捷。

基本的React组件通过React提供的createClass方法来创建，通过render()方法进行组件UI以及其中数据属性等的传递，当然关于数据、属性、状态等的处理，React有自己的办法，值得注意的是，React的开发中用到了一种可选的JSX语法。下面是创建一个组件的简单示例：

``` JavaScript
var Square = React.createClass({
    //render()方法负责页面UI
    render: function () {
        //在组建内定义的CSS样式
        var squareStyle = {
            height: 150,
            backgroundColor: this.props.color
        };
        //return出去的就是UI的最终结构
        return (
            <div style={squareStyle}></div>
        );
    }
});
```

### 样式
React组件化思想的另一个体现是，可以在组件内部写只属于本组件的样式代码，如上面所示，可以将样式写入一个对象内部，然后在组件结构上通过style属性进行赋值传递。在JSX语法中，有以下的CSS规则需要注意
- 带短线的CSS样式写成驼峰式，例如text-align，写成textAlign;
- 一般px单位不需要写，自动赋值，例如上面的"height: 150"，当然如果不是px为单位的话，就需要手动加上；
- 除了不带短线的CSS属性之外，其它的属性值必须要带引号，例如`fontSize: "20"`;
- CSS的属性值可以通过props等传递（上面的backgroundColor）。

当然，React也支持传统的样式表，在JSX语法中，必须通过className来为组件添加类名（因为class是关键字）。

也可以通过内联样式来添加。

### 学习示例
- [React组件化示例](http://codepen.io/fanyj1994/full/bWbZjK)
- [React复杂组件示例](http://codepen.io/fanyj1994/full/MmgxzM)
- [React事件监听](http://codepen.io/fanyj1994/full/gWYEGx)
- [React样式处理](http://codepen.io/fanyj1994/full/BRBbYY)
- [React数据处理](http://codepen.io/fanyj1994/full/MmgxVR)
- [React生命周期](http://codepen.io/fanyj1994/full/XRrGBr)
- [react状态处理](http://codepen.io/fanyj1994/full/jmNJeX)
- [React给白板上色](http://codepen.io/fanyj1994/full/PmYLdQ)
- [React router创建单页应用](http://codepen.io/fanyj1994/full/jmNJXd)
- [React-to-do-list](http://codepen.io/fanyj1994/full/wdwOOx)

### 代码分割

1. React.lazy()可动态加载组件，也就是在父组件render的时候，进行动态引入：

```React.lazy(() => import('./someComponent.js'));```

同时，React提供一个Suspense组件，这个组件可以接受一个fallback属性，为动态导入组件指定备选渲染的内容，例如一个loading动画：

``` js
const someComponent = React.lazy(() => import('./someComponent.js'));
render() {
    return (
        <div>
            <Suspense fallback={<Loading />}>
                <someComponent />
            </Suspense>
        </div>
    )
}
```

整体来讲，动态加载是为了重要的内容能够更快地执行。

### context

context 提供一种在多级组件中共享数据的方法，这样就不用通过 props 每层传递。

官方指出，如果仅仅是为了避免每一级传递数据，使用component composition简单得多。

### 为什么不要用index作为JSX元素的key值

存在风险，因为React区别DOM元素的唯一标识是key值，如果这个值不变，DOM就不会更新，当以index作为key值，如果数组本身不变，没问题，但是，如果数组发生改变，例如中间插入一个值，这个时候，从这个位置开始到后面的位置，所有的index对应的内容已经改变，但对于React来讲，index仍然是原来的序号，他并不会更新DOM。
