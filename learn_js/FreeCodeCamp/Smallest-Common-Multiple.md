<style>
body {
  padding: 20px 0;
}
</style>

# Smallest Common Multiple

/*找出能被两个给定参数和它们之间的连续数字整除的最小公倍数。

范围是两个数字构成的数组，两个数字不一定按数字顺序排序。

例如对 1 和 3 —— 找出能被 1 和 3 和它们之间所有数字整除的最小公倍数。*/

<b>A: </b>最小公倍数，也就是说找到某一个数，能被这所有的数字整除。我们的思路是先将所有的数从大到小排列到一个新数组，然后取最大的两个数字的最小公倍数multiple，将这个数字被剩余的数字依次进行整除，只要有一个数字不能够整除，则将前面求出的最小公倍数multiple倍增，再进行整除操作，重复上面的过程，直至求出所有数字的最小公倍数。代码：
```javascript
function smallestMultiple(arr) {
	//新建一个数组newArr，将arr中数字从小到大依次排入
	var newArr = [];
	for (var i = Math.max(arr[0], arr[1]); i >= Math.min(arr[0], arr[1]); i--) {
		newArr.push(i);
	}

	var multiple = 0, loop = 1, n;

	do {
		//取得前两个最大数的最小公倍数（相邻两个数的最小公倍数就是它们的乘积）
		multiple = newArr[1] * newArr[0] * loop;

		//将数组中剩余的数字与前面的乘积进行整除，若不能，退出循环，loop加1
		for (var i = 2; i < newArr.length; i++) {
			if (multiple % newArr[i] !== 0) {
				break;
			}
		}
		loop++;
	} while (i !== newArr.length);	//如果上面的数字没有测试完毕，loop加1后继续上面的操作

	return multiple;
}
```
在上面的方法中，<code>do {some operation} while (condition)</code>语句指的是当condition为真，执行do下面的句子，值得注意的是，不管condition是否为真，do后面的语句都会首先执行一次。
