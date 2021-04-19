import express from 'express'
import jwt from 'jsonwebtoken'
import { userController } from '../controllers/userController.js'
const router = express.Router()
import mongoose from 'mongoose'
let ObjectId = mongoose.Types.ObjectId
let User = mongoose.model('User')
import { SECRET_KEY } from '../config/jwt.js'

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

export { router }
