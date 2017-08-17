const fs = require('fs')

// readGFileSync 是阻塞执行，等文件读取完成后才会执行下一步，readFile 是非阻塞执行
fs.readFile('introduce.txt', (err, data) => {
  if (err) return
  console.error(err)

  console.log(data.toString())
})

console.log('程序执行结束')
