const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
  if (!req.headers.access_token) res.status(400).json({message: "missing token"})

  try {
    const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    req.UserId = decoded.id
  } catch (err) {
    res.status(500).json({message: err.message})
  }

}


module.exports = authentication