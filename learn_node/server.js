const http = require('http')

http.createServer((request, response) => {
  response.writeHeader(200, {'Content-type': 'text/plain'})
  response.end('Hello world')
}).listen('3000')

console.log('Server running at http://127.0.0.1:3000')
