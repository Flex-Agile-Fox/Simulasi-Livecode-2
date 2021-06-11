const router = require('express').Router()
const InventoryController = require('../controllers/InventoryController')

router.post('/inventories', InventoryController.fetch)

module.exports = router