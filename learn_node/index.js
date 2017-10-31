const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')

const handle = {}
handle['/'] = requestHandlers.start
handle['/start'] = requestHandlers.start
handle['/upload'] = requestHandlers.upload

server.startServer(router.route, handle)

/*
 * 函数式编程的主要奥义在于规划好函数的功能划分，
 * 其实就是参数的需求与传递，
 * 按照一定的参数链条，
 * 会有相当明确的执行思路
*/