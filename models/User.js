const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../config/jwt')
const Schema = mongoose.Schema
const HASH_ROUND = 10

const UserSchema = new Schema({
  username: String,
  password: String,
  email: {type: String, required: [true, 'can\t be blank'], unique: true, index: true},
  isAdmin: Boolean
}, {timestamps: true})

UserSchema.methods.setPassword = function (myPassword) {
  let hash = bcrypt.hashSync(myPassword, HASH_ROUND)
  this.password = hash
}

UserSchema.methods.comparePassword = function (myPassword, hashPassword) {
  return bcrypt.compareSync(myPassword, hashPassword)
}

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    isAdmin: this.isAdmin
  }
}

UserSchema.methods.generateJWT = function(payload) {
  const option = {
    expiresIn: 600 * 60,
  }
  return jwt.sign(payload, SECRET_KEY, option)
}

mongoose.model('User', UserSchema)
