# Where art thou

** Q: ** 写一个 function，它遍历一个对象数组（第一个参数）并返回一个包含相匹配的属性-值对（第二个参数）的所有对象的数组。如果返回的数组中包含 source 对象的属性-值对，那么此对象的每一个属性-值对都必须存在于 collection 的对象中。

例如，如果第一个参数是` [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }]`，第二个参数是 `{ last: "Capulet" }`，那么你必须从数组（第一个参数）返回其中的第三个对象，因为它包含了作为第二个参数传递的属性-值对。<!-- more -->

#### 我的解法
事实上，我们前面遇到过一个只判断数组中的对象是否具有某一属性，且属性值为真的[题](https://fanyj1994.github.io/2017/01/08/2017-01-08-%E5%88%A4%E6%96%AD%E6%95%B0%E7%BB%84%E4%B8%AD%E7%9A%84%E5%AF%B9%E8%B1%A1%E6%98%AF%E5%90%A6%E6%9C%89%E6%9F%90%E4%B8%80%E5%B1%9E%E6%80%A7%E4%B8%94%E5%80%BC%E4%B8%BA%E7%9C%9F/)，今天这道题可以算作是前面这道题的加强版。

这道题我前段时间在迷乱中解决了很久，最后没能解决，一方面是我的态度问题，另一方面是我对于数组方法的不清晰。今天翻出来，能够思路比较清晰地解决，并且解决方法在FCC github的解法中属于Intermediate Code Solution，可以看见我的进步。

既然是从一个数组中筛选满足某些条件的项，我们自然能够想到`Arrray.filter()`方法，这个方法接收一个测试函数，返回一个包含通过测试的元素的新数组。

而我们的测试函数应该承担的功能是，每一项拥有source对象中的属性，并且值相等，这个时候，我们能想到的是数组方法`Array.every()`方法，该方法同样接受一个测试函数，只有所有的项通过测试，才能够返回true，也就是说，我们可以将source对象中的所有属性转入到一个数组中，才能方便遍历。为了实现这个转换过程，我们有一个对象方法`Object.keys()`，该方法会返回一个由对象自带的所有可枚举属性组成的数组，它与`for-in`返回的枚举属性顺序一致，，其区别在于后者会枚举对象从原型链上继承到的属性，详见[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)。我们将source的所有属性转换到数组propsArr中：`var propsArr = Object.keys(source);`转换完之后，我们便可以借助`Array.every()`进行测试。测试对象是否含有一个属性，我们可以使用`obj.hasOwnProperty()`方法进行测试。完整代码如下：
``` javascript
function where(collection, source) {
  // 将source属性存入数组
  var propsArr = Object.keys(source);

  return collection.filter(function (obj) {
    return propsArr.every(function (prop) {
      return obj.hasOwnProperty(prop) && obj[prop] === source[prop];
    });
  });
}
```

#### for循环遍历
在这种方法中，借助`Array.filter()`方法以及for循环来实现判断，直接上代码：
``` javascript
function where(collection, source) {
  var propsArr = Object.keys(source);

  return collection.filter(function (obj) {
    for (var i = 0; i < propsArr.length; i++) {
      if (!obj.hasOwnProperty(propsArr[i]) ||
        obj[propsArr[i]] !== source[propsArr[i]] ) {
            return false;
      }
    }
    return true;
  });
}
```
在这种方法中，我们在for循环内部使用条件判断，对于collection中的每一个对象我们都进行两方面的判断，第一个是它是否含有`propsArr`的中属性，第二个是，在它拥有这些属性之后，这些属性值是否与source中的属性值一致。这两种条件只要有一个不通过测试，我们就返回false，只有在全部通过测试之后，才能被保留。

####  Array.reduce()方法
仍然尝试使用强大的`Array.reduce()`方法进行解决。

``` javascript
function where(collection, source) {
  var propsArr = Object.keys(source);

  return collection.filter(function (obj) {
    return propsArr.reduce(function (prevAtr, curAtr) {
      return obj.hasOwnProperty(curAtr) &&
        obj[curAtr] === source[curAtr];
    }, false);
  });
}
```
运用`Array.reduce()`方法对第二个参数提取的属性数组进行迭代，通过条件判断直接返回true或者false，可以说是十分高效的。
