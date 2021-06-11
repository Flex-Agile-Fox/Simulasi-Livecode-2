const router = require('express').Router()
const userRoutes = require('./users')
const inventoryRoutes = require('./inventories')

router.use(userRoutes)
router.use(inventoryRoutes)

module.exports = router