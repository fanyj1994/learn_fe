相信大部分前端小伙伴已经有过使用 Grid 布局的体验，一定是美滋滋。Flex 布局和 Grid 布局作为 CSS 布局领域的两大新星，可谓是拥护者甚众。我在前面[这篇](http://fanyongjian.com/2018/03/13/2018-03-13-%E5%85%B3%E4%BA%8E%20Flex%20%E7%9A%84%E9%82%A3%E7%82%B9%E4%BA%8B%E5%84%BF/)文章中总结了 Flex 布局的强大之处，今天再来总结一下 Grid 布局的基础知识。
<!-- more -->
# 基本介绍

Grid 布局在 2017 年开始已经逐渐获得各大主流浏览器的支持，虽然暂时无法在生产环境中运用，但是它作为一项令所有 UI 工程师欢欣鼓舞的技术，是值得马上去了解它的奥妙的。为了获得更好的调试体验，我们可以在 FireFox 浏览器中学习它（FireFox 的开发者工具对它的支持很友好）。

那么，它与传统的布局方案，包括前面介绍的 Flex 布局方案相比的特性在于：

- 它是第一个真正意义上的布局系统，其主要表现在它是第一个**基于二维方向的布局模块**
- 它是第一个基于网格（或者叫栅格，本文叫网格）的原生布局系统

所谓基于二维方向，是指它可以针对水平和垂直方向两个维度上进行布局设计。在它之前，我们的布局方案，只能在水平方向上进行布局，对于垂直方向则无能为力，而 Grid 则可以轻松地实现二维布局。

那么，什么是网格呢？我们可以这样理解，网格是由一组水平和垂直的直线交叉，形成一个个矩形区域，我们可以将元素放置在这些区域中，这样的好处是，元素可以很好地控制和对齐。

可以说，我们以前采取的布局方案，其实是工程师们没法子想出来的办法，毕竟 `position`,`display` 等属性，并不是为了布局而生的。而 CSS Grid，才是一个真正的布局系统。

# 核心概念

了解了 CSS Grid 布局的优越性，我们马上来了解如何运用这项技术。

和 Flex 类似，Grid 的使用同样简单，第一步，我们需要把某个容器指定成网格容器：

``` css
.grid {
    display: grid || inline-grid;
}
```

这个时候，`.grid` 就变成了一个 **网格容器（Grid Conatainer）**，包含在这个容器中的子元素则自动变成了 **网格项(Grid Items)**， Grid 的所有属性都在两个概念之间展开。

下面这张图，就是一个网格容器中，包含着 9 个网格项。

![Grid 示意](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e368f2937?w=608&h=380&f=png&s=2015)

上面这个等宽的三行三列的布局，如何实现呢？在传统方案中，我们可能需要借助浮动属性等来实现，但是借助 Grid ，就很简单了，在为父元素指定 `display: grid;` 之后，我们可以借助两个属性: `grid-template-columns`, `grid-template-rows` 和一个新单位 `fr` 来轻松实现。

``` css
.grid {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 20px 10px;
}
```

`grid-template-columns` 和 `grid-template-rows` 分别表示水平方向上和垂直方向上网格项的空间分配比例，`fr` 是一个新单位，表示占据可用空间的一等分。所以上面的代码表示，在水平和垂直方向分别把可用空间分为三份，且三份占据空间相等。`grid-gap` 属性指的是网格项之间的间隙，后面会介绍到。

学习到了这两个属性，我们已经可以轻松地布局出常见的多栏布局，例如我们要实现一个水平为 1:2:1 的布局，可以这样实现：

``` css
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 10px;
}
```

![grid 实现 1-2-1 三栏布局](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e2b9d8e29?w=822&h=282&f=png&s=1749)

当然我们同样可以为上面的属性设置固定的长度，例如像素值。

Grid 布局为我们提供一个 `repeat()` 函数来更高效地实现复杂的布局，它可以接收两个值，第一个值是重复的数量，第二个值是重复的模式，例如：`repeat(3, 1fr)` 表示三等分的布局，`repeat(3, 1fr 200px)`表示把1fr 加一个200px的布局重复三次。

以上的赋值形式可以混杂来使用，例如：

``` css
grid-template-columns: 200px 1fr repeat(3, 100px);
```

上面的布局从左到右呈现为：200px 1fr 100px 100px 100px.

## `grid-auto-columns` `grid-auto-rows`

在我们没有显示地借助前面的 `grid-template-columns` 和 `grid-template-rows` 来指定网格项的空间分配方式的时候，我们可以使用 `grid-auto-columns` 和 `grid-auto-rows` 两个属性来设置网格区域的自动显示范围，经常可以借助一个工具函数 `minmax()` 来指定，例如 `grid-auto-rows: minmax(120px, auto)`，表示不管网格区域中有没有内容，其高度最小为 120px,如果其有超过 120px 的部分的内容，则自动扩张。

## 网格线（Grid Line）

所谓网格线，就是两个网格轨道之间以及网格边缘的直线，在上面这个三行三列的网格中，水平和竖直方向上各有四条网格线，在 Grid 中，我们通常按照书写方向，为这些网格线编号，水平方向上，我们从左至右，将它们编号为 “1， 2， 3， 4···”，竖直方向上同理，从上往下编号，如下图所示：

![网格线](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e2ba52561?w=630&h=383&f=png&s=10722)

## 网格轨道（Grid Track）

网格轨道指的是任意两条网格线之间的空间（这条线不一定看得见），在上面的图片中，我们可以清晰地看到水平和竖直方向上黑线之间的网格轨道，而我们的网格项就是在这些轨道上安放。

## 网格区域（Grid Area）

网格区域，就是若干个相邻的网格单元组成的区域，我们可以通过组合网格单元来创建出不同大小的网格区域。

下面为了不致混乱，我们分网格容器和网格项来说明它们上面可以设置的属性。

网格容器上可以设置的属性有（因为二维布局，基本来说，某一个针对水平方向的属性，同样有一个数值方向的属性与之相对应，为了方便，我们一起介绍它们）：

1. `display: grid || inline-grid || subgrid`
2. `grid-template-columns` 和 `grid-template-rows`
3. `grid-auto-columns` 和 `grid-auto-rows`
4. `grid-auto-flow`
5. `grid-column-gap` 和 `grid-row-gap` 以及两者合写 `grid-gap`
6. `justify-items`
7. `align-items`
8. `justify-content`
9. `align-content`
10. `grid-template-area`

网格项上面可以设置的属性有：

1. `grid-column-start`
2. `grid-column-end`
3. `grid-row-start`
4. `grid-row-end`
5. `grid-column`（1 和 2 的合写形式）
6. `gird-row`（3 和 4 的合写形式）
7. `grid-area`
8. `justify-self`
9. `align-self`

别看上面的属性很多，其实读者完全不必慌，一则是这些属性中高频使用的就几个，二者是上面好几组属性完全可以用它们的缩写形式来替代。下面来介绍其中高频使用的一些属性（更详细的大家可以在 MDN 上查看详情介绍），前面已经了解的部分不再赘述。

## `grid-gap`

`grid-gap` 用来设置网格间距，也就是两个网格之间留出来的空白，其可以在横向和纵向分别通过 `grid-column-gap` 和 `grid-row-gap` 来设置相应的大小，这两个属性值通常可以合写为 `grid-gap`：

``` css
.grid {
    grid-gap: 20px 10px;
}
```

在横向设置 10px 的间距，纵向设置 20px 的间距，如果，横向和纵向要设置的大小一致时，可以直接缩写为一个值： `grid-gap: 20px;`

我们可以从这张图上看到这些概念。

![网格核心概念](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e2c78dc73?w=643&h=431&f=png&s=30729)

## `grid-template-areas`

这个属性十分方便，可以通过指定网格单元的名字来定义一个网格模板，然后在网格项上面使用 `grid-area` 属性与之配合，来确定其显示的区域。重复相同的网格单元的名字，就会自动合并两个单元，可以使用一个句点 `.` 来表示一个空白的网格单元。例如以下的一个布局形式：

![grid-area](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e2e626a15?w=964&h=395&f=png&s=3932)

代码：

``` css
.grid {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "header header header"
                         "siderbar content content"
                         "footer footer footer"
}

.one {
    grid-area: header;
}

.two {
    grid-area: siderbar;
}

.three {
    grid-area: content;
}

.four {
    grid-area: footer;
}
```

通过实例我们可以看到，在网格容器上，我们为其定义网格区域的显示模板，然后在相应的网格项上将设置好的 grid-area-name 赋值给 `grid-area` 属性，这样就可以很便捷地达到我们的效果。

## `justify-items` 和 `align-items`

我们知道在 Flex 布局中，可以借助 `justify-content` 以及 `align-items` 来设置弹性项目在水平和竖直方向的对齐方式，强大的 Grid 系统自然也可以进行设置，其属性和 Flex 很相似，分别使用 `justify-items` 和 `align-items`(后者和 Flex 一致有没有)。不同的是，这两个属性的属性值是参照网格线来确定它们的位置：

``` css
.grid {
    justify-items: start | end | center | stretch;
}
```

属性值介绍：

- **stretch**: 默认值，内容充满整个网格区域
- **start**：网格项内容与网格区域左侧对齐
- **end**: 网格项内容与网格区域右侧对齐
- **center**: 网格项内容在网格区域居中显示

`align-items` 与前者相同道理，不再赘述。如果在前面的例子中，我们将这两个属性值设置为 `center`， 则它们就会呈现为下面这幅样子：

![justify-items 和 align-items](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e2c42c31f?w=959&h=382&f=png&s=7473)

## `gird-column` 和 `grid-row`

除了在网格容器上统一进行的设置，我们可以针对特定的网格项进行设置，决定其占据的网格区域，我们可以借助网格线的约束，来决定某一个网格项的空间。例如，我们想要实现一个元素占据水平方向从第 1 条网格线到第 3 条网格线，竖直方向从第 2 条网格线到第 4 条网格线，也就是下面红色元素的位置：

![跨轨道放置元素](https://user-gold-cdn.xitu.io/2018/4/29/1630fb2e5e979b3f?w=816&h=556&f=png&s=3338)

如何实现呢，水平方向借助这两个属性：`grid-column-start`, `grid-column-end`，分别表示该网格项开始和结束的网格线序号，其值是代表网格线的编号。

``` css
.item1 {
    grid-column-start: 1;
    grid-column-end: 3
}
```

竖直方向同理，使用 `grid-row-start` 和 `grid-row-end` 两个属性实现：

``` css
.item1 {
    grid-row-start: 2;
    grid-row-end: 4;
}
```

如此一来，就可以实现上面图中的效果，这两组属性同样有相应的缩写形式，我们把 `grid-column-start`, `grid-column-end` 合写为 `grid-column`，把 `grid-row-start` 和 `grid-row-end` 合写为 `grid-row`，其值用一个 `/` 来分隔。

``` css
grid-column: 1/3;
grid-row: 2/4;
```

## `justify-self` 和 `align-self`

这两个属性用来设置特定网格项目在其网格区域中的对齐方式，其可取的属性值与 `justify-items` 和 `align-items` 相同。不再说明。

## 更改重叠区域的层级顺序

当两个网格区域在空间上发生重叠之时，其层叠顺序按照其在 DOM 结构中的出现前后决定，后来者会居上。如果我们想人为改变这些重叠次序，可以为相应的区域设置 `z-index` 属性，来改变它的层叠优先级，这和定位元素的设置一致。

以上就是 Grid 布局的基本概念，我们可以看到，最常用的几个属性是：`grid-template-*` 相关的几个属性，用来指定网格区域留白的 `grid-gap`，以及用来声明网格项目在各自网格区域中的对齐方式的 `align-items` 以及 `justify-items` 两个属性。在网格项上，用来指定网格项显示区域的 `grid-column` 以及 `grid-row` 属性，指定特定网格项在其网格区域中对齐方式的 `align-self` 和 `justify-self` 属性。用熟了这些属性，Grid 布局的使用自然是手到擒来，至于其它更复杂的属性，在后来的学习中循序渐进使用并熟悉。文中有什么疏漏和错误之处，希望大家指正。

# 参考资料

- [[译] Grid 布局完全指南 | CSS-Tricks](https://juejin.im/entry/589c7b618d6d81006c824444#prop-grid)
- [MDN - 网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)