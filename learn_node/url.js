const url = require('url')
const http = require('http')

http.createServer((req, res) => {
  if (req.url != '/favicon.ico') {
    const result = url.parse(req.url, true)

    console.log('url result', result)
  }

  res.writeHead(200, {
    'Content-Type': 'text/html;charset=UTF-8'
  })

  res.write('<h1 style="text-align: center;">Hello NodeJS</h1>')

  res.end()
}).listen(3000)