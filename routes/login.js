const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.post('/', (req, res, next) => {
  if (!req.body.email)
    return res.status(422).json({error: {email: 'Email can\'t be blank'}})
  if (!req.body.password)
    return res.status(422).json({error: {password: 'Password can\'t be blank'}})
  User.findOne({email: req.body.email}).then(function(user) {
    if (!user) return res.json({error: 'user not found'})
    if (!user.comparePassword(req.body.password, user.password)) return res.json({error: 'Email or password is invalid'})
    return res.json({success: true})
  })
})

module.exports = router
