const express = require('express')
const router = express.Router()
let mongoose = require('mongoose')
let User = mongoose.model('User')

router.get('/', (req, res) => {
  res.send('User home page')
})

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
  console.log(req.authorization)
  next()
}

router.get('/:id', verified, (req, res) => {
  console.log(req.params.id)
})

module.exports = router
