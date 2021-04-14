const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
let mongoose = require('mongoose')
const SECRET_KEY = require('../config/jwt')
let ObjectId = mongoose.Types.ObjectId
let User = mongoose.model('User')

router.post('/', (req, res, next) => {
  let user = new User()
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  if (!username || username === '')
    return res.status(422).json({message: 'username can\'t be blank'})
  if (!password || password === '')
    return res.status(422).json({message: 'password can\'t be blank'})
  if (!email || email === '')
    return res.status(422).json({message: 'email can\'t be blank'})
  user.username = username
  user.setPassword(password)
  user.email = email
  user.isAdmin = true
  user.save().then(() => {
    return res.json({user: user.toAuthJSON()})
  })
})

let verified = function(req, res, next) {
  if (!req.headers.authorization) return res.status(403).json({message: 'No token provided'})
  const token = req.headers.authorization.slice(7)
  try {
    let decoded = jwt.verify(token, SECRET_KEY)
    req.jwtDecoded = decoded
    next()
  } catch(err) {
    return res.status(401).json({message: 'Unauthorized'})
  }
}

router.get('/:email', verified, (req, res) => {
  User.findOne({email: req.params.email}).then(user => {
    if (!user) return res.json({message: 'User not found'})
    return res.json({user: user.toAuthJSON()})
  })
})

router.put('/:id', verified, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.json({message: err})
    if (Object.keys(req.body).length === 0) return res.json({message: 'No value for update'})
    if (req.body.username) user.username = req.body.username.trim()
    return user.save().then(() => res.json({user: user.toAuthJSON()}))
  })
})

router.get('/', (req, res) => {
  res.send('User home page')
})

module.exports = router
