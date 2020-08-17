const { Router } = require('express')
const shopControllers = require('./shop')

console.log(shopControllers)

module.exports = async function initControllers () {
  const router = Router()
  router.use('/api/shop', await shopControllers())
  return router
}