let fs = require('fs')

// 获取文件或目录信息
fs.stat('index.js', (error, stats) => {
  if (error) {
    console.log(error)
    return false;
  } else {
    console.log(stats)
    console.log(`文件: ${stats.isFile()}`)
    console.log(`目录：${stats.isDirectory()}`)

    return false
  }
})

// 创建目录
fs.mkdir('example', err => {
  if (err) {
    console.log(err)
    return false;
  } else {
    console.log('目录创建成功')
  }
})


// 删除目录
fs.rmdir('example', err => {
  if (err) {
    console.log(err)
    return false;
  } else {
    console.log('目录删除成功')
  }
})

// 全覆盖写入文件
const fileContent = 'Hello Node fs'
fs.writeFile('accounting.js', fileContent, err => {
  if (err) {
    console.log(err)
    return false;
  } else {
    console.log('内容写入成功')
  }
})

// 追加内容
fs.appendFile('accounting.js', '这一句是追加的内容', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('内容追加成功')
  }
})

// 读取文件内容
fs.readFile('index.js', (err, data) => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log(`data: ${data}`)
  }
})

// 读取目录信息
fs.readdir('node_modules', (err, data) => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log(`目录读取成功: ${data}`)
  }
})

// 重命名文件和剪切文件
fs.rename('accounting.js', 'tmp/acount.js', err => {
  if (err) {
    console.log(err)
    return false
  } else {
    console.log('文件重命名成功')
  }
})