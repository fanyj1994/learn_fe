const fs = require('fs')

let fileReadStream = fs.createReadStream('index.js')

let count = 0

let str = ''

fileReadStream.on('data', chunk => {
  console.log(`${++count} 接收到：${chunk.length}`)

  str += chunk
})

fileReadStream.on('end', () => {
  console.log('结束')
  console.log(count)
  console.log(str)
})

fileReadStream.on('error', error => {
  console.log(error)
})

// 流的写入
let writeStream = fs.createWriteStream('index.js')
let data = 'console.log("这是动态写入数据")'
writeStream.write(data, 'utf8')

writeStream.end()

writeStream.on('finish', () => {
  console.log('写入完成')
})