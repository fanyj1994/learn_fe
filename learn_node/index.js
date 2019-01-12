const server = require('./server')
const router = require('./router')
const requestHandlers = require('./requestHandlers')
const circle = require('./circle')

const handle = {}
handle['/'] = requestHandlers.start
handle['/start'] = requestHandlers.start
handle['/upload'] = requestHandlers.upload
handle['/show'] = requestHandlers.show

const newCircumference = circle.circumference(3),
      newArea = circle.area(3)

console.log(newCircumference, newArea)

server.start(router.route, handle)
