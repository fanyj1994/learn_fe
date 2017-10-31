const http = require('http')
const url = require('url')
const port = 8080

function startServer(route, handle) {
  function onRequest(req, res) {
    const pathname = url.parse(req.url).pathname
    // console.log('Request for ' + pathname + ' recieved!')

    route(handle, pathname, res)
  }

  http.createServer(onRequest).listen(port)
  console.log('Server has started at port ' + port)  
}

exports.startServer = startServer