const fs = require('fs')

// readGFileSync 是阻塞执行，等文件读取完成后才会执行下一步，readFile 是非阻塞执行
fs.readFile('introduce.txt', 'utf-8', (err, data) => {
  if (err) return
  console.error(err)

  console.log(data.toString())
})

// 同步读取文件
const example = fs.readFileSync('example.txt', 'utf-8')
console.log(example)
console.log('程序执行结束')

// 写入内容到文件使用 wirteFile 方法，同理，同步写入有一个 writeFileSync 方法
const data = '这是动态写入的文件内容'
fs.writeFile('write.txt', data, err => {
  console.log(err)
})

// 使用 stat() 方法获取文件的信息，其返回一个 stat 对象
fs.stat('introduce.txt', (err, stat) => {
  if (err) {
    console.log(err)
  } else {
    // 判断是否是文件
    console.log('isFile: ' + stat.isFile())
    // 判断是否是目录
    console.log('isDirectory: ' + stat.isDirectory())

    if (stat.isFile()) {
      // 获取大小
      console.log('size: ' + stat.size)
      // 创建时间
      console.log('birth time: ' + stat.birthtime)
      // 修改时间
      console.log('modifed time' + stat.mtime)
    }
  }
})

// steam 文件读取流
const read = fs.createReadStream('event.js', 'utf-8')
read.on('data', chunk => {
  console.log('Data:')
  console.log(chunk)
})

read.on('end', function () {
  console.log('end')
})

read.on('error', function (err) {
  console.log('Error:' + err)
})

// stream 文件写入流
const write = fs.createWriteStream('write.txt')
write.write('使用 write 方法写入的数据···\n')
write.write('end.')
write.end()

// pipe() 方法管道
const intr = fs.createReadStream('introduce.txt')
const exam = fs.createWriteStream('example.txt')

intr.pipe(exam)
