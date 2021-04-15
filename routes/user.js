const express = require('express')
const jwt = require('jsonwebtoken')
const userController = require('../controllers/userController')
const router = express.Router()
let mongoose = require('mongoose')
let ObjectId = mongoose.Types.ObjectId
let User = mongoose.model('User')
const SECRET_KEY = require('../config/jwt')

router.post('/', userController.post)

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

router.get('/:id', verified, userController.get)
router.put('/:id', verified, userController.update)
router.post('/:id', verified, userController.delete)
router.get('/', userController.home)

module.exports = router
