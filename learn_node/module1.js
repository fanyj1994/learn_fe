console.log('在 Node 中启动吧')
 const a = 1
 console.log(a)
 
const m2 = require('./module2')
const _ = require('underscore')
// console.log(m2())
console.log(_)

let http = require('http')

const server = http.createServer(function (request, response) {
  console.log('服务器跑起来了')
  response.write('哈哈哈')
  response.end()
})

server.listen(3000)
