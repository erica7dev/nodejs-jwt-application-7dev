const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthenticatedError('Token not provided')
  }

  const token = authHeader.split(' ')[1]

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    req.user = { id, username }
    next()
  } catch (err) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware