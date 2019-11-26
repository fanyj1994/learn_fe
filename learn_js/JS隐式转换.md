
本文从以下问题出发：

1. `[1] == [1]`
2. `null == undefined`
3. `...`

加号会首先调用 toPrimitive() 方法。

一元操作符，+ 或者 - 会将转换为数值类型，后者转完之后取负。

当 + 号任意一边为字符串类型时，会使用 `toString` 方法将两边的值转为字符串类型，进行字符串拼接操作，所以：

``` JS
1 + '1' === '11'
```

其次，+ 在遇到一些特殊操作时，有相应的特殊处理方法：

``` js
1 + NaN === NaN
+0 + (+0) === +0
Infinity + (-Infinity) === NaN
```

### 运算优先级

### 全等与相等

<https://github.com/jawil/blog/issues/5>
<https://zhuanlan.zhihu.com/p/29064256>
