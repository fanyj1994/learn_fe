// sYmbol 是 es6 中新增的一种原始数据类型，其表示独一无二的值
let s1 = Symbol()
console.log(typeof s1)
// Symbol 中可以传入一个参数，作为其本身的描述，在转换为字符串的时候区分自己，并没有属性上的功能
let s2 = Symbol('hello')
console.log(s2.toString())

// Symbol 常用于作对象的属性名，以防止冲突
const name = Symbol()
const person = {}
person[name] = 'fan' // 注意不能用.操作符来访问变量，. 后面的值会被解析为字符串
console.log(person[name])

/*
* 所以说 Symbol 类型的值的用途在于，我们明确需要一个独一无二的值，且不关心是什么值
* 另外注意，Symbol 类型作为对象属性的时候，不能被 for-in, for-of以及 Object.keys()等方法遍历，但又不是私有属性
**/
