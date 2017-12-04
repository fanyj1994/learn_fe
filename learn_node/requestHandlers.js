const querystring = require('querystring'),
      fs = require('fs'),
      formidable = require('formidable')

function start(response) {
  console.log('/start页面的请求处理程序执行了')
  const body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" />' +
  '</head>' +
  '<body>' +
  '<form action="/upload" method="post">' +
  '<input type="file" name="upload">' +
  '<input type="submit" value="Upload file" />' +
  '</form>' +
  '</body>' +
  '</html>'

  response.writeHead(200, {'Content-Type': 'text/html'})
  response.write(body)
  response.end()
}

function upload(response, request) {
  console.log('/upload页面的请求处理程序执行了')

  // 读取表单内容
  const form = new formidable.IncomingForm()
  console.log('About to parse')
  form.parse(request, (error, fields, files) => {
    console.log('parse done.')
    console.log(files.upload.path)
    // fs.renameSync(files.upload.path, '/tmp/test.png')
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write('recieved image;<br>')
    response.write('<img src="/show">')
    response.end()
  })
}

function show(response) {
  fs.readFile('tmp/test.png', 'binary', (err, file) => {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'})
      response.write(err + '\n')
      response.end()
    } else {
      response.writeHead(200, {'Content-Type': 'image/png'})
      response.write(file, 'binary')
      response.end()
    }
  })
}

exports.start = start
exports.upload = upload
exports.show = show
