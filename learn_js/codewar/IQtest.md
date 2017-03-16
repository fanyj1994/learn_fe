# Codewar-IQ Test
检测一组数中在奇偶性上与其他数字不同的一个数的位置。例如"1,3,4,7,9"中只有4是偶数，所以返回它的位置3.
[原题地址](https://www.codewars.com/trainer/javascript)

```javascript
function iqTest(numbers) {
    //给出的参数是字符串，先将其转换为数字数组
    var numArr = numbers.split(' ').map(num => parseInt(num));

    //分别将数组中的奇数和偶数分开
    var odd = numArr.filter(num => num % 2 == 1),
       even = numArr.filter(num => num % 2 == 0);

    //通过判断奇偶数的个数来返回具体的位置，注意要加一   
    return odd.length < even.length ? numArr.indexOf(odd[0]) + 1
        : numArr.indexOf(even[0] + 1);
}
```
