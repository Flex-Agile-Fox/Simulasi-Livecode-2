const { User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

  static register(req, res, next) {
    const { email, password } = req.body
    User.create({
      email,
      password: bcrypt.hashSync(password, 8)
    })
      .then((user) => {
        res,status(201).json({ id: user.id, email: user.email })
      })
      .catch(err => {
        res.status(500).json({message: err.message})
      })

  }

  static login(req, res, next) {
    const { email, password } = req.body

    User.findOne({ where: { email }})
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
          res,status(200).json({ access_token })
        }
      })
      .catch(err => {
        res.status(500).json({message: err.message})
      })
  }
}

module.exports = UserController