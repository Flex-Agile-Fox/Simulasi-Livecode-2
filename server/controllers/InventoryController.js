const {Inventory} = require('../models')

class InventoryController {

  static fetch(req, res, next) {
    Inventory.findAll()
      .then(inventory => {
        res.status(200).json({ inventory })
      })
      .catch((err => {
        res.status(200).json({ message: err.message })
      }))
  }
}

module.exports = InventoryController