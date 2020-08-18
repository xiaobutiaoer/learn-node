const express = require('express')
const { resolve } = require('path')
const { promisify } = require('util')
const initControllers = require('./controllers')
const initMiddlewares = require('./middlewares')

const server = express()
const port = parseInt(process.env.PORT || '9000')
const publicDir = resolve('public')

server.use('/api/shop', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

async function bootstrap() {
  server.use(express.static(publicDir))
  // 初始化中間件
  server.use(await initMiddlewares())
  // 挂载路由，服务启动时初始化路由
  server.use(await initControllers())

  server.use(errorHandler)
  await promisify(server.listen.bind(server, port))()
  console.log(`> Started on port ${port}`)
}

function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    // 如果是在返回响应结果时发生了异常，
    // 那么交给 express 内置的 finalhandler 关闭链接
    return next(err)
  }

  console.error(err)
  res.redirect('/500.html')
}


// 監聽未捕獲的Promise異常
// 直接退出進程

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})


bootstrap()