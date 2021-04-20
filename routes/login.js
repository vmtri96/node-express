import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
const User = mongoose.model('User')

router.post('/', (req, res, next) => {
  if (!req.body.email)
    return res.status(422).json({message: 'Email can\'t be blank'})
  if (!req.body.password)
    return res.status(422).json({message: 'Password can\'t be blank'})
  User.findOne({email: req.body.email}).then(function(user) {
    if (!user) return res.json({error: 'user not found'})
    if (!user.comparePassword(req.body.password, user.password)) return res.json({message: 'Email or password is invalid'})
    const token = user.generateJWT({email: req.body.email, isAdmin: user.isAdmin})
    return res.json({success: true, token: token})
  })
})

export { router }
