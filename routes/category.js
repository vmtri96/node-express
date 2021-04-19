import express from 'express'
const router = express.Router()
import { categoryController } from '../controllers/categoryController.js'

router.get('/', categoryController.getAll)

export { router }
