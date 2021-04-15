const db = require('../models')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

const userController = {}

userController.post = (req, res) => {
  let user = new db.User()
  let { username, password, email } = req.body
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
}

userController.get = (req, res) => {
  db.User.findOne({'_id': ObjectId(req.params.id)}).then((user) => {
    if (!user) return res.json({message: 'User not found'})
    return res.json({user: user.toAuthJSON()})
  })
}

userController.update = (req, res) => {
  db.User.findById(req.params.id).then((user) => {
    if (!user) return res.json({message: 'User not found'})
    if (!req.body.username) return res.json({message: 'No value to update'})
    user.username = req.body.username
    return user.save().then(() => {
      return res.json({message: 'Update successfully', user: user.toAuthJSON()})
    })
  })
}

userController.delete = (req, res) => {
  db.User.findById(req.params.id).then((user) => {
    if (!user) return res.json({message: 'User not found'})
    return user.deleteOne({'_id': ObjectId(req.params.id)}, function(err) {
      if (err) return res.json({message: err})
      return res.json({message: 'Delete successfully'})
    })
  })
}

userController.home = (req, res) => {
  res.send('User home page')
}

module.exports = userController
