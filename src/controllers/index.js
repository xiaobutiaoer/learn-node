const { Router } = require('express')

const chaosCotrollers = require('./chaos')
const healthController = require('./health')

const shopControllers = require('./shop')

console.log(shopControllers)

module.exports = async function initControllers () {
  const router = Router()

  router.use('./api/health', await healthController())
  router.use('/api/chaos', await chaosCotrollers())

  router.use('/api/shop', await shopControllers())
  
  return router
}
