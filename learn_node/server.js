const http = require('http')
const url = require('url')

function start (route, handle) {
  function onRequest (req, res) {
    let postData = ''
    const pathname = url.parse(req.url).pathname
    console.log('来自' + pathname + '的请求。')
    console.log('Request has recieved!')

    req.setEncoding('utf8')

    req.addListener('data', (postDataChunk) => {
      postData += postDataChunk
      console.log('Recieved POST data chunk ' + postDataChunk + '.')
    })

    req.addListener('end', () => {
      route(handle, pathname, res, req)
    })
  }

  http.createServer(onRequest).listen(8888)
  console.log('Server has started.')
}

exports.start = start
