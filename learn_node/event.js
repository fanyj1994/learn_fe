const events = require('events')

// 通过eventEmitter 类来绑定和监听事件，相当于一个观察者
const eventEmitter = new events.EventEmitter()

const connectHandler = () => {
  console.log('连接成功！')
  eventEmitter.emit('data_received')
}

// on用来绑定事件处理程序
eventEmitter.on('connection', connectHandler)

eventEmitter.on('data_received', () => {
  console.log('数据接收成功')
})

// emit 用来触发事件
eventEmitter.emit('connection')

eventEmitter.on('listener1', (arg1, arg2) => {
  console.log('listener1', arg1, arg2)
})

// 监听器只会被执行一次
eventEmitter.once('once', (arg1) => {
  console.log('once被执行了一次')
})

// 移除指定事件的监听器
eventEmitter.removeListener('once', () => {
  console.log('listener1 事件监听器被移除了')
})

eventEmitter.emit('listener1', 'arg1 参数', 'arg2 参数')
eventEmitter.emit('once')
eventEmitter.emit('once')

console.log(eventEmitter.listeners('connection'))

console.log('程序执行完毕')
