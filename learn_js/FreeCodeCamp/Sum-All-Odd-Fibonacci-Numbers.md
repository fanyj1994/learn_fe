# Sum All Odd Fibonacci Numbers

/*给一个正整数num，返回小于或等于num的斐波纳契奇数之和。

斐波纳契数列中的前几个数字是 1、1、2、3、5 和 8，随后的每一个数字都是前两个数字之和。

例如，sumFibs(4)应该返回 5，因为斐波纳契数列中所有小于4的奇数是 1、1、3。

提示：此题不能用递归来实现斐波纳契数列。因为当num较大时，内存会溢出，推荐用数组来实现。*/

### 递归实现
递归实现比较简单。
```javascript
function fib(n) {
	return n < 2 ? n : (fib(n - 2)	+ fib(n - 1));
}
```
此种方法，当n较大时，会发生内存溢出现象。

### 数组缓存实现
```javascript
function fibs(n){
	var fibarr = [1,1];
	if(n >= 2){
	  	for(var i = 2; i < n; i++) {
	    	fibarr[i] = fibarr[i - 2]+fibarr[i - 1];
	  	}
		return fibarr[n - 1];
	}  
}
```
在这种方法中，通过循环逐次将满足要求的数添加到数组中，在多次使用时，这种方法表现比较优秀。

在做FreeCodeCamp的练习的时候，有一道题目是给一个正整数num，返回小于或等于num的斐波纳契奇数之和。分析这道题目，有两个需要注意的点，第一个是最后一个数字小于num，第二个是只求奇数的和。这道题的解法如下：
```javascript
function sumFibs(num) {
	var fibArr = [1];
	//转换思路，将i设置为要推入的斐波那契数
	for(var i = 1; i <= num;) {
    	fibArr.push(i);
    	i = fibArr[fibArr.length - 2] + fibArr[fibArr.length - 1];
	}

	//通过数组的reduce方法进行累加
	return fibArr.reduce(function (prev, cur) {
		//判断奇数还是偶数
		if (cur % 2 !== 0) {
			return prev + cur;
		} else {
			return prev;
		}
	});
}
```
这个解法的聪明之处在于在循环的时候将循环变量设置为斐波那契数字。有一种逆向推解的妙处。
