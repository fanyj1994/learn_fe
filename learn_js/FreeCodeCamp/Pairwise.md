# Pairwise
给定一个数组，要求返回数组中两项之和等于第二个参数**arg**的项的索引之和，举个例子，`([1, 3, 2, 4], 4)`只有第一项和第二项之和等于4，所以返回其索引值之和0 +1  = 1.值得注意的是，如果出现两组一样的满足条件的数字，返回索引之和更小的一组，例如`([1, 1, 1], 2)`，应该返回0 + 1 = 1，而不是1 + 1 = 2.<!-- more -->

#### 循环遍历法

这个问题最常见的解法是利用循环遍历，找出满足条件的项，然后返回其索引值。
``` javascript
function pairwise(arr, arg) {
  var sum = 0;
  //复制一个数组，不影响原数组
  var pairArr = arr.slice();
  for (var i = 0; i < pairArr.length; i++) {
    //内部循环要从外部循环的下一位开始
    for (var j = i + 1; j < pairArr.length; j++) {
      if (pairArr[i] + pairArr[j] === arg) {
        sum += i + j;
        pairArr[i] = pairArr[j] = NaN;
      }
    }
  }
  return sum;
}
```
在这种解法中，利用双层的循环对数组依次进行遍历，结合条件语句将满足条件的项数进行累加，并在循环结束后返回。

#### 我的解法
对于数组的遍历，我首先想到了`Array.map()`方法的使用，而对于索引值的返回，我们可以使用`Array.indexOf()`方法。下面是我的解法。
``` javascript
function pairwise(arr, arg) {
  var sumIndex = 0;
  arr.map(function (val, index) {
    //查找从当前项的下一项开始
    if (arr.indexOf(arg - val,index + 1) > 0) {
      sumIndex += arr.indexOf(arg - val,index + 1) + index;
      //将满足条件的两个项的值设置为任何非数值，与上面方法中NaN相似
      arr[index] = arr[arr.indexOf(arg - val,index + 1)] = 'a';
    }
  });

  return sumIndex;
}
```
在上面的遍历中，我们需要注意的是，在与当前项进行比较时，查找要从当前项的下一项开始，这样避免两个当前项的和满足条件的情况。

#### Array.reduce()方法解决
从前面的学习中可以知道，任何关于数组遍历的问题都可以通过`Array.reduce()`方法来解决。
``` javascript
function pairwise(arr, arg) {
  var pairArr = arr.slice();//复制数组
  return pairArr.reduce(function (a, b, index) {
    var search = arg - b;
    var curIndex = pairArr.indexOf(search, index + 1);
    if (curIndex !== -1) {
      var total = index + curIndex;//满足条件的索引值之和
      pairArr.splice(index, 1, NaN);//将满足条件的当前值替换为NaN
      pairArr.splice(curIndex, 1, NaN);
      return a + total;//加上满足条件的索引值之和，并返回
    }
    return a;//如果没有找到符合条件的值，直接返回a
  }, 0);
}
```
可以看到，使用`Array.reduce()`方法不再需要sum变量来存储值，而是可以将结果直接保存在遍历的返回值中。另外这个方法使用了`Array.splice()`方法来替换满足条件的项，值得注意的是，这个方法会对原数组直接做修改。
