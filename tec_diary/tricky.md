1. Chrome 中防止表单自动填充问题

在自动填充的表单元素添加以下属性，开始设置为只读，focus时移除只读属性。
``` JS
<input readonly onfocus="this.removeAttribute('readonly');" />
```