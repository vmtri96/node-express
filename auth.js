import jwt from 'jsonwebtoken'
import { SECRET_KEY } from './config/jwt.js'

const verified = (req, res, next) => {
  if (!req.headers.authorization) return res.json({message: 'No token provided'})
  let token = req.headers.authorization.slice(7)
  try {
    let decoded = jwt.verify(token, SECRET_KEY)
    next()
  } catch (err) {
    return res.json({message: err})
  }
}

const isAdmin = (req, res, next) => {
  if (!req.headers.authorization) return res.json({message: 'No token provided'})
  let token = req.headers.authorization.slice(7)
  try {
    let decoded = jwt.verify(token, SECRET_KEY)
    if (!decoded.isAdmin) return res.json({message: 'Unexpected user permission'})
    req.email = decoded.email
    next()
  } catch (err) {
    return res.json({message: err})
  }
}

export { verified, isAdmin }
