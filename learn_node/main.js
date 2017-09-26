'use strict'

// 在 hello.js 中使用 module.exports报出的变量可以在本模块中使用 greet 来访问
const greet = require('./hello')  

const name = 'fan'

greet(name)
