<style>
body {
  padding: 20px 0;
}
</style>

# Drop it
<b>Q: </b>一个函数要实现这样的功能，第一个参数是数组，第二个参数是一个测试函数，依次对数组的元素进行测试，若后者返回false，则弹出此元素，直至第一个返回true的元素，并返回此元素以及其后面的元素组成的数组，例如`drop([1, 2, 3], function(n) {return n < 3; });`返回`[1, 2, 3]`.

<b>A: </b>每一个问题都有许多种解法，我们可以实现多种解法，并从中求得最优解。

### 利用for循环实现

利用循环，将数组的元素依次进行测试，不满足使用`Array.prototype.shift()`弹出，直到遇到第一个返回true，则结束循环，并返回剩余的元素。
``` javascript
function drop(arr, func) {
  var length = arr.length;
  for (var i = 0; i < length; i++) {
    if (func(arr[0])) {
      break;	//返回true则退出循环
    } else {
      arr.shift(); //弹出第一个元素
    }
  }
  return arr;
}
```
值得注意的是，要提前将数组的长度进行存储，当数组元素被弹出后，`arr.length`会一直变化。

### 利用Array.filter和Array.indexOf实现
``` javascript
function drop(arr, func) {
  var newArr = arr.filter(func);
  var index  = arr.indexOf(newArr[0]);

  return index >= 0 ? arr.slice(index) : [];
}
```
### 利用while来实现

这种方法和第一种方法比较相似。从第一个数组元素开始测试，如果arr长度不为0，且不通过func测试，则弹出此元素，当某一个元素通过测试时，返回剩余元素。这种方法的好处是利用while直接测试数组长度为0的情形，不必要再分开考虑。
``` javascript
function drop(arr, func) {
  while (arr.length > 0 && !func(arr[0])) {
    arr.shift();
  }
  return arr;
}
```
