// 请求处理函数
const exec = require('child_process').exec

function start(res) {
  console.log('request \'start\' was called. ')

  exec('ls -lah', (error, stdout, stderr) => {
    res.writeHead(200, {'Content-type': 'text/plain'})
    res.write(stdout)
    res.end()
  })
}

function upload(res) {
  console.log('request \'upload\' was called.')
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('Hello Upload')
  res.end()
}

exports.start = start
exports.upload = upload

