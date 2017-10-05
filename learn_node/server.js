const http = require('http')
const fs = require('fs')
const url = require('url') // 解析url
const path = require('path') //处理本地文件路径

http.createServer((request, response) => {
  console.log(request.method + ':' + request.url)
  response.writeHeader(200, {'Content-type': 'text/plain'})
  response.end('Hello world')
}).listen('3000')

console.log('Server running at http://127.0.0.1:3000')

// url 的 parse 方法
const my_blog = url.parse('http://www.fanyongjian.com/blog?category=fe#1')
console.log(my_blog)

// 解析当前目录
const work_dir = path.resolve('.')
const file_path = path.join(work_dir, 'index.html')
console.log(file_path) 

const root = path.resolve(process.argv[2] || '.')
console.log('Static root dir: ' + root)

const server = http.createServer((request, response) => {
  const pathname = url.parse(request.url).pathname
  const filepath = path.join(root + pathname)

  fs.stat(filepath, (err, stat) => {
    if (!err && stat.isFile()) {
      console.log('200' + request.url)
      response.writeHead(200)
      fs.createReadStream(filepath).pipe(response)
    } else {
      console.log('404' + request.url)
      response.writeHead(404)
      response.end('404 Not Found')
    }
  })
})