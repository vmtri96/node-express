import express from 'express'
const router = express.Router()
import { categoryController } from '../controllers/categoryController.js'
import { verified, isAdmin } from '../auth.js'

router.get('/', categoryController.getAll)
router.post('/', [verified, isAdmin], categoryController.create)
router.put('/:id', [verified, isAdmin], categoryController.update)
router.post('/:id', [verified, isAdmin], categoryController.delete)

export { router }
