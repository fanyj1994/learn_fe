const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {  // async 标记的为异步函数
  await next()  // 异步函数中使用 awaite 关键字处理下一个函数
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello Koa2!</h1>'
})

app.listen(3000)
console.log('App start at port 3000...')
