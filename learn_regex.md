# 什么是正则表达式
正则表达是式用来匹配符合你要求的格式的字符串的规则

### 元字符
- `.` 表示除了换行符之外的任意单个字符
- `[]` 表示匹配方括号内的任意字符
- `[^ ]` 表示匹配除了方括号内字符的任意字符
- `*` 表示匹配大于前面0个的字符
- `+` 表示匹配大于前面1个的字符
- `?` 表示前面的字符为可选
- `{n, m}` 表示匹配前面字符 n~m 次
- `(xyz)` 匹配与xyz完全相等的字符串
