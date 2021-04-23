import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))

const mongoDB = 'mongodb://localhost:27017/expressdb'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
mongoose.set('debug', true)


import { router } from './routes/index.js'
app.use(router)

app.listen(port, () => {
  console.log('App listening at port ' + port)
})
