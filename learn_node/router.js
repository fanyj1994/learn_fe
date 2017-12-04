function route(handle, pathname, response, request) {
  console.log('一个来自' + pathname + '的路由请求')

  if (typeof handle[pathname] === 'function') {
    return handle[pathname](response, request)
  } else {
    console.log('不存在对' + pathname + '的请求处理程序。')
    response.writeHead(404, {'Content-Type': 'text/plain'})
    response.write('404 Not Found.')
    response.end()
  }
}

exports.route = route
