# Sum All Numbers in a Range

/*我们会传递给你一个包含两个数字的数组。返回这两个数字和它们之间所有数字的和。
最小的数字并非总在最前面。*/

### 通过for循环遍历

通过这种方法比较常见，代码如下：
```javascript
function sumAll(arr) {
	//因为给定数组大小顺序不定，所以得到最大值和最小值
	var min = Math.min.apply(null,arr),
		max = Math.max.apply(null,arr),
		sum = 0;
	for (var i = min; i <= max; i++) {
		sum += i;
	}
	return sum;
}
```

### 通过Array.reduce()方法实现
<code>Array.reduce()</code>是Array的一个迭代方法，它接收一个函数作为累加器，数组中的每一个值从左到右合并为一个值。由此，代码如下：
```JavaScript
function sumAll(arr) {
	var min = Math.min.apply(null,arr),
		max = Math.max.apply(null,arr),
		sum = 0;

	//将最大值和最小值之间的数字全部加入数组
	for (var i = min + 1; i < max; i++) {
		arr.push(i);
	}

	return sum = arr.reduce(function (prev,next) {
			return prev + next;
		});
}
```
这种方法借用数组的累加迭代方法，但需要用for循环往数组中添加数字，故而更为复杂。
