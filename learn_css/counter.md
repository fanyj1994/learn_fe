CSS 计数器（counter）是由 CSS 维护的变量，其主要用途是，可以通过指定的规则来计算节点元素的使用次数。
<!-- more -->
计数器的使用很简单，分为以下三步：

1. __初始化计数器__。
2. __指定增量规则__。
3. __应用计数器__。

这三步分别对应这计数器的三个属性和方法：

1. `counter-reset`
2. `counter-increment`
3. `counter()/counters()`


下面使用一个例子，来熟悉这些规则。

首先，我们拥有一个如下的列表。

``` html
<ul>
  <li>第一项</li>
  <li>第二项</li>
  <li>第三项</li>
</ul>
```

接下来我们使用计数器来为这个列表前面加上序号，使它呈现为下面这个样子。

![counter example](http://oq717k0qe.bkt.clouddn.com/18-4-7/52219779.jpg)

很简单，如前面所述，三步走：

第一步，初始化计数器。我们使用 `counter-reset` 操作，这个属性可以接受两个值为一组的多组属性值，第一个值，我们为计数器起个名字，第二个值，我们指定该计数器的初始值。

``` css
counter-reset: custom-name integer;
```

第一个计数器的名称必须由字母、数字、下划线、中划线组成，且第一个字符必须为字母。第二个为整数，可以为负值，默认值为0.一般情况下我们把它定义在它的父元素上。

此属性可以指定多组，代表多个计数器，例如：

``` css
counter-reset: counter1 counter2 1 counter3 -2;
```

上面的规则定义了三个计数器，第一个名称为 counter1 初始值为 0，第二个 counter2 初始值为1，第三个counter3 初始值为 -2。

所以回到上面的例子，我们的列表要从1开始，所以，我们可以如下定义：

``` css 
ul {
    counter-reset: items 0; /* 0 可以省略 */
}
```

初始化之后，第二步，指定计数器增量规则。我们使用 `counter-increment` 来实现这个目的，这个属性的值和前面的 `counter-reset` 十分类似，同样是由两个值组成的多组值，第一个值同样是由 `counter-reset` 初始化好的计数器名称，第二个值为该计数器的增量，默认值为 1.

``` css
counter-increment: counter-name integer;
```

举例，针对上面的三个计数器，我们分别为它们指定不同的增量规则：

``` css
counter-increment: counter1 counter2 -1 counter3 2
```

我们为 counter1 没有指定增量，所以它会按照默认值 1 递增，counter2 按 1 递减，counter3 按 2 递增。

再次回到我们的例子，我们为已经初始化好的 items 计数器指定以 1 递增的增量规则：

```
li {
    counter-increment: items 1; /* 1 同样可以省略 */
}
```

很简单吧，接下来就是第三步，应用我们指定好的计数器。一般来说，计数器常用于自动生成列表项的递增规则，所以经常在伪类元素的 `content` 属性中使用它，同样，我们需要一个 `counter()` 函数的帮助来将相应计数器注入 `content` 属性中，我们把计数器的名称传入到此函数可以完成应用。并且可以定制更个性化的计数规则。直接上例子：

``` css
li:before {
    content: counter(items) '. ';
}

```

这样，我们就为三个列表项前面添加了‘1. 2. 3.’的计数规则。另外，`counter()` 方法可以指定第二个参数，来约束计数器的显示规则，例如指定为 `lower-roman`，则它会按照小写罗马数字的形式递增：ⅰⅱⅲⅳ···，至于这个值可以取什么值，其实就是 [list-style-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)` 可以取的值它都可以。

需要注意的是，除了初始化操作，其它两项操作必须要指定在相应的列表项上才能生效。

# 计数器嵌套

计数器特别强大的一点是，在一个嵌套的列表项，它会为内层的子元素自动添加计数器，我们可以在使用计数器的时候，应用 `counters()` 函数的第二个参数来指定子项的连接符。例如：

``` css
content: counters(counter-name, '-');
```

在以上规则中，列表的子项会呈现为‘1-1， 1-2， 1-3’这样的形式。上例子：

``` html
<!-- html -->
<ul>
    <li>
        <ul>
            <li></li>
        </ul>
    </li>
    <li>
        <ul>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </li>
    <li>
        <ul>
            <li></li>
            <li></li>
        </ul>
    </li>
</ul>

<!-- css -->
ul {
  counter-reset: content;
  list-style-type: none;
}
ul li:before {
  counter-increment: content;
  content: counters(content, "-") ". ";
}
```

它呈现出来的效果如下图：

![counter 嵌套](http://oq717k0qe.bkt.clouddn.com/18-4-7/61238160.jpg)

以上就是对 CSS 计数器的简单介绍。你可以看张鑫旭大神的[这篇](http://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/)查看更详细生动的介绍。
