const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')

const login = async (req, res ) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new BadRequestError('Please provide username and password')
  }

  const id = new Date().getDate() //provided by db, this is a test

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async(req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized your lucky number: ${luckyNumber}`
  })
}

module.exports = {
  login,
  dashboard
}