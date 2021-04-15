const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
let mongoose = require('mongoose')
let ObjectId = mongoose.Types.ObjectId
let User = mongoose.model('User')
const SECRET_KEY = require('../config/jwt')

router.post('/', (req, res, next) => {
  let user = new User()
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  if (!username || username === '')
    return res.status(422).json({error: {username: 'can\'t be blank'}})
  if (!password || password === '')
    return res.status(422).json({error: {password: 'can\'t be blank'}})
  if (!email || email === '')
    return res.status(422).json({error: {email: 'can\'t be blank'}})
  user.username = username
  user.setPassword(password)
  user.email = email
  user.save().then(() => {
    return res.json({user: user.toAuthJSON()})
  })
})

let verified = function(req, res, next) {
  if (!req.headers.authorization) return res.json({message: 'No token provided'})
  let token = req.headers.authorization.slice(7)
  try {
    let decoded = jwt.verify(token, SECRET_KEY)
    next()
  } catch (err) {
    return res.json({message: err})
  }
}

router.get('/:id', verified, (req, res) => {
  User.findOne({'_id': ObjectId(req.params.id)}).then((user) => {
    if (!user) return res.json({message: 'User not found'})
    return res.json({user: user.toAuthJSON()})
  })
})

router.put('/:id', verified, (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) return res.json({message: 'User not found'})
    if (!req.body.username) return res.json({message: 'No value to update'})
    user.username = req.body.username
    return user.save().then(() => {
      return res.json({message: 'Update successfully', user: user.toAuthJSON()})
    })
  })
})

router.post('/:id', verified, (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) return res.json({message: 'User not found'})
    return user.deleteOne({'_id': ObjectId(req.params.id)}, function(err) {
      if (err) return res.json({message: err})
      return res.json({message: 'Delete successfully'})
    })
  })
})

router.get('/', (req, res) => {
  res.send('User home page')
})

module.exports = router
