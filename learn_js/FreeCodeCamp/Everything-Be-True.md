<style>
body {
  padding: 20px 0;
}
</style>

# Everything Be True
<b>Q: </b>有一个every函数，给定两个参数，第一个参数为包含不定数量对象的数组collection，第二个参数为属性pre，要求检测collection中的每个对象都有属性pre，并且pre的值为true，则函数返回true，反之返回false.

<b>A: </b>通过了解题意，我首先想到的是通过`Array.every()`方法来测试collection，用`obj.hasOwnProperty()`方法来判断是否有pre属性，判断属性值是否为真，则可以用到Boolean()方法操作。代码如下：<!-- more -->
``` javascript
function every(collection, pre) {
  return collection.every(function (obj) {
    return obj.hasOwnProperty(pre) && Boolean(obj[pre]);
  });
}
```
完成这个方法之后，我在FreeCodeCamp的Github上面发现了运用`Array.reduce()`方法的强大，[这篇文章](https://github.com/FreeCodeCamp/FreeCodeCamp/wiki/JS-Reduce-Made-Easy)介绍了它的强大之处。这篇文章提到我们可以用`Array.reduce()`方法更高效地解决任何数组相关的问题，而不是用for循环或者while循环。在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)查阅`Array.reduce()`的详细介绍。

下面是运用`Array.reduce()`方法解决这个问题：
``` javascript
function truthCheck(collection, pre) {
  return collection.reduce(function(acc, next) {
    if (next[pre]) {
      return acc;
    }
    else {
  	  return false;
	}
  },true);
}
```
这个方法的巧妙之处在于，将reduce方法的初始值设为true，只有当没有pre属性或者属性值为false的时候，返回false.
