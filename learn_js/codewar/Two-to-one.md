# Two to one
Take 2 strings s1 and s2 including only letters from ato z. Return a new sorted string, the longest possible, containing distinct letters, - each taken only once - coming from s1 or s2.

### Examples:
``` javascript
a = "xyaabbbccccdefww"
b = "xxxxyyyyabklmopq"
longest(a, b) -> "abcdefklmopqwxy"

a = "abcdefghijklmnopqrstuvwxyz"
longest(a, a) -> "abcdefghijklmnopqrstuvwxyz"
```

### Solution
``` javascript
function longest(s1, s2) {
    var newArr = [];
    var arr1 = s1.split('');
    var arr2 = s2.split('');
    //forEach只对每项元素进行操作，没有返回值
    arr1.forEach(ele => {if (newArr.indexOf(ele) === -1) newArr.push(ele)});
    arr2.forEach(ele => {if (newArr.indexOf(ele) === -1) newArr.push(ele)});
    return newArr.sort().join('');
}
```
