<style>
body {
  padding: 20px 0;
}
</style>

# Sum All Primes

只有 1 和它本身两个约数的数叫质数。例如，2 是质数，因为它只能被 1 和 2 整除。1 不是质数，因为它只能被自身整除。
给定的数不一定是质数。


<b>A: </b>先包装一个函数<code>isPrimes</code>，用来判断一个数字是否为质数：
```javascript
function isPrimes(number) {
    for (var i = 2; i <= number; i++) {
    	if (number % i === 0 && i != number) {
        	return false;
      	}
    }
    //所有小于本身的数字都不能被除了自身和1的数字整除，返回true
    return true;
}
```
接着通过for循环来判断从2到num之间的所有质数，并将它们存储到一个数组arrPrimes中。
```javascript
	var arrPrimes = [];
	for (var i = 2; i <= num; i++) {
	    if(isPrimes(i)) {
			arrPrimes.push(i);
	    }
	}
```
此时我们已经取得了所有满足要求的质数数组，使用数组的<code>reduce</code>累加方法求和，并将结果返回。
```
return arrPrimes.reduce(function (prev, cur) {
	return prev + cur;
});
```
完整代码如下：
```javascript
function sumPrimes(num) {
	var arrPrimes = [];
	//判断是否为质数
	function isPrimes(number) {
		for (var i = 2; i <= number; i++) {
			if (number % i === 0 && i != number) {
			    return false;
			}
		}
		//所有小于本身的数字都不能被除了自身和1的数字整除，返回true
		return true;
	}

	//当数字为1的时候，返回0（0和1都不是质数）
	if (num == 1) {
		return 0;
	}

	for (var i = 2; i <= num; i++) {
		if(isPrimes(i)) {
			  arrPrimes.push(i);
		}
	}

	return arrPrimes.reduce(function (prev, cur) {
		return prev + cur;
	});
}
```
