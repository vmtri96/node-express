import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { Schema } = mongoose
const HASH_ROUND = 10
const SECRET_KEY = 'mykey'

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
    username: this.username,
    email: this.email,
    isAdmin: this.isAdmin
  }
}

UserSchema.methods.generateJWT = function(payload) {
  const option = {
    expiresIn: 60 * 60,
  }
  return jwt.sign(payload, SECRET_KEY, option)
}

const User = mongoose.model('User', UserSchema)
export { User }
