传统的布局方案，基于 `display` + `position` + `float` 属性实现，但是，传统的布局方案有很多限制，在布局要求越来越多的今天，很多布局需要花费很大精力才能实现。

在这样的背景下，Flex 布局在 2009 年横空出世，它可以轻松地满足各种各样的布局需求，例如垂直居中等。它是一个新的盒子模型概念，弹性容器中的子元素可以在任何方向上根据已有空间进行伸缩自适应，以实现最佳的填充视觉效果，并且子元素之间不会相互重叠。 

运用 Flexbox 可以很容易实现垂直居中等。其更适用于一个 UI 组件内的元素布局呈现。

使用 Flex 很简单，只需要指定一个盒子的 `display` 属性即可以。

``` css
.container {
    display: flex || inline-flex;
}
```

这个时候，这个盒子被叫做“弹性容器”（flex container），盒子里面的子元素叫做“弹性项目”（flex items）。在这个容器中，存在两条轴线，一条沿着默认书写方向的主轴(main axis)，以及和它垂直的交叉轴(cross axis)， Flex 布局就是在这样的环境下实现的。

> [**书写模式**](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)是一个 W3C 新增的属性，可以通过 `direction: ltr | rtl;` 来设置，是文本在页面内的排列方向，由于语言排列方向的差异，会有不同书写方向的需求。默认情况下，其是从左到右，从上到下来书写的，这种情况下，水平方向就是 flex 项目的主轴方向，垂直方向就是交叉轴方向。

容器内的子元素叫做 **flex 项目(flex items)**。下面，就是 Flex 的一些基本概念。

# Flex 基本概念

Flex 的基本属性并不多，常用的也就四五个。下面，分为容器和项目分别介绍。

### 容器的主要属性

弹性容器上主要涉及到的概念有以下几个：

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

下面一次介绍在书写方向为从左到右，从上至下情况下各个属性值以及其值的表现形式。

#### flex-direction

定义布局的主轴方向。

``` css
.container {
    flex-direction: row | row-reverse | column | column-reverse
}
```

各属性值分别表示水平（从左到右），水平（从右至左），垂直（从上到下），垂直（从下到上）。

#### flex-wrap

定义当弹性项目超出一行时，是否换行。

``` css
.container {
    flex-wrap: wrap | nowrap | wrap-reverse;
}
```

各个属性值分别表示换行，不换行，向反方向换行（默认向上）。

#### flex-flow

`flex-flow` 是 `flex-direction` 和 `flex-wrap` 属性的合写形式，其默认值为：`row nowrap`,同理可以设置为 `column wrap` 等值。

#### justify-content

`justify-content` 用来设定弹性项目在主轴方向上的对齐方式。

``` css
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

#### align-items

`align-items` 表示弹性项目在交叉轴方向上的对齐方式。其属性值与 `jsutify-content` 类似。

``` css
.container {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```

上面属性中，设置为 `center` 的时候，很容易实现垂直居中布局，`baseline` 表示根据第一行文字的基线对齐，`stretch` 表如果项目没有设置高度，或者为 `auto`,则项目在交叉轴方向会填充满整个容器高度。

#### align-content

`align-content` 表示多行项目的对齐方式，也就是，在交叉轴上，所有的项目是如何排列的。所以其只有在项目不止一行的时候有效。

``` css
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

### 弹性项目的主要属性

以上是 flex 容器所具有的主要属性。下面是 flex 项目的主要属性设置。

- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self
- order

#### flex-grow

指的是 flex 项目在空间分配上的拉伸因子，是一个默认为1的数字，flex 项目会根据设置的数值按比例分配。

#### flex-shrink

指的是 flex 项目在必要时的收缩因子，与上面一个属性对应。所谓必要，指的是空间不足的时候，属性值不能为赋值，如果属性值为 0，则该项目不会收缩。

#### flex-basis

指的是 flex 项目在分配空间时的默认大小， flex 项目在这个参数的基础上进行伸缩变化。当该属性的值为 auto 的时候，其初始的占空间按照其中的内容决定。内容越多，其初始值越大。也可以为其设置初始的宽高度值。

#### flex

`flex` 是前面三个属性的简写形式。 默认值为 `1 0 auto`.

``` css
.item {
    flex: flex-grow flex-shrink flex-basis;
}
```

这个属性有两个特殊的值，`auto` 和 `none`， `auto` 等价于 `1 1 auto`, `none` 等价于 `0 0 auto`.

看下面的例子：

```css
article:nth-child(1) {
  flex: 1 200px;
  order: 1; /*flex项的排列顺序，默认为0，越大越后，负数为前*/
}
article:nth-child(2) {
  flex: 5 400px;
}
article:nth-child(3) {
  flex: 1 200px;
  order: -1;
}
```

本例中将整个空间分成了7分，第一个和第三个子项分别占用七分之一的空间，中间一个占七分之五。后面的 200px 和 400px 意思是 flex 项目的最小宽度。

#### align-self

`align-self` 是前面 `align-items` 的特殊呼应，为一个或多个特定的项目设置在交叉轴上的对齐方式，故而属性值与 `align-items` 一致。

``` css
.item {
    align-self: flex-start | flex-end | stretch | center | baseline;
}
```

#### order

通过设置 `order` 属性来改变 flex 项目的默认排列顺序，默认为 0，可以为负值，越大越后面，越小越前面。 order 相等时，位置由 HTML 元素出现的前后确定。

以上就是 Flex 布局的基本知识和概念，一共涉及到 12 个属性，但常用的就几个，多加练习，自然很轻松上手。

下面是一个 flex 布局的基本应用示例，运用了 flex 的各个参数项。
[Example](http://codepen.io/fanyj1994/full/eWOaZG)

> 参考资料
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [一劳永逸的搞定 flex 布局](https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb)
