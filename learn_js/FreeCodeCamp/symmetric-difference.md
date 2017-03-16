# symmetric Difference
<b>Q: </b>创建一个函数，接受两个或多个数组，返回所给数组的 对等差分(symmetric difference) (△ or ⊕)数组.

给出两个集合 (如集合 A = {1, 2, 3} 和集合 B = {2, 3, 4}), 而数学术语 "对等差分" 的集合就是指由所有只在两个集合其中之一的元素组成的集合(A △ B = C = {1, 4}). 对于传入的额外集合 (如 D = {2, 3}), 你应该安装前面原则求前两个集合的结果与新集合的对等差分集合 (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).<!-- more -->

<b>A: </b>理解了什么是对等差分数组之后，这个问题并不难。我们仍然积极拥抱ES6的新特性。今天介绍了解新增的扩展操作符，用<code>...</code>表示，可以用来函数调用以及数组字面量的位置扩展表达方式。举例说明：
``` javascript
function myFunction(x, y, z) { }
const args = [0, 1, 2];
myFunction(...args);
```
在上面的传参过程中，我们运用了扩展操作符。可以说，展开操作符是更好的apply()方法。这个例子出自于MDN，详情点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)。我们可以使用此操作符将传入函数的参数转换到数组中（上一篇中的<code>Array.from()</code>方法同样可以）。我们新建一个数组进行存储：
``` javascript
const argsArr = [...arguments];
```
将参数传入一个数组之后，为了比较处理两个数组，我们自然想到了强大的<code>Array.reduce()</code>方法，而为了判断两个数组中元素中出现一次的元素，我们可以使用<code>Array.filter()</code>以及<code>Array.indexOf()</code>进行判断，并将迭代完的结果存入symArr数组。
``` javascript
const symArr = argsArr.reduce((prev, cur) => {
  const difA = prev.filter(items => cur.indexOf(items) === -1);
  const difB = cur.filter(items => prev.indexOf(items) === -1);

  return difA.concat(difB);
});
```
这个时候，我们的任务就算完成了，但是，在我测试时，竟然发现数组中会有重复的元素，我们需要去掉数组中重复的元素，这个算法以前遇到过，可以借助<code>Array.filter()</code>过滤。
``` javascript
symArr.filter((ele, index, self) => self.indexOf(ele) == index);
```
完整代码如下：
``` javascript
function sym(args) {
  const argsArr = [...arguments];

  const symArr = argsArr.reduce((prev, cur) => {
    const difA = prev.filter(items => cur.indexOf(items) === -1);
    const difB = cur.filter(items => prev.indexOf(items) === -1);

    return difA.concat(difB);
  });

  //筛出重复元素
  return symArr.filter((ele, index, self) => self.indexOf(ele) == index);
}
```
