const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const mongoDB = 'mongodb://localhost:27017/expressdb'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.set('debug', true)

require('./models/User')

const router = require('./routes')
app.use(router)

app.listen(port, () => {
  console.log('App listening at port ' + port)
})
