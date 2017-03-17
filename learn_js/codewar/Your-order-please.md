# Your order please
[题目](https://www.codewars.com/kata/your-order-please/train/javascript)

先将子串进行分割，运用正则表达式来匹配每个子串中的数字字符，比较函数通过对数字字符的大小
判断来决定子串排序，排序完毕后再粘连在一起即可。

``` javascript
function order(words) {
    return words.split(' ').sort((a, b) => a.match(/\d/g) - b.match(/\d/g))
        .join(' ');
}
```
