import express from 'express'
import { verified } from '../auth.js'
import { userController } from '../controllers/userController.js'
const router = express.Router()

router.post('/', userController.post)
router.get('/:id', verified, userController.get)
router.put('/:id', verified, userController.update)
router.post('/:id', verified, userController.delete)
router.get('/', userController.home)

export { router }
