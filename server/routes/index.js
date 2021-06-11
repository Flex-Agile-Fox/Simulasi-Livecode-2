const router = require('express').Router()
const userRoutes = require('./users')
const inventoryRoutes = require('./inventories')
const authentication = require('../middlewares')

router.use(userRoutes)
router.use(authentication)
router.use(inventoryRoutes)

module.exports = router