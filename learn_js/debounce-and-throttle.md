### 防抖和节流

防抖指的是，一个函数在一段时间内只能执行一次，如果在这段时间内多次触发，则重新计算时间来执行。

常见场景：输入框校验；防止表单多次提交等

实现思路：使用延时函数实现，每次触发函数时，取消定时器，重新执行。

``` js
function debounce(fn, delay = 800) {
  let timer = null

  return function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}
```

节流指的是，一个函数在一个时间段内只能执行一次，如果多次触发，只有一次能生效。

常见场景：多次触发的高频事件回调，例如拖拽事件。

实现思路：

``` js
function throttle(fn, duration) {
  let current = 0

  if (Date.now() > current + duration) {
    return function () {
      fn.apply(this)
      current = +new Date()
    }
  }

}
```
