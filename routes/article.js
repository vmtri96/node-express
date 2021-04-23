import express from 'express'
import { articleController } from '../controllers/articleController.js'
import { verified, isAdmin } from '../auth.js'
import multer from 'multer'
import path from 'path'

const router = express.Router()

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb)
  }
})

function checkFileType(req, file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeTypes = fileTypes.test(file.minetype)
  if (!extname && !mimeTypes) {
    req.fileValidationError = 'Upload image only'
    return cb(null, false, req.fileValidationError)
  }
  return cb(null, true)
}

router.get('/', articleController.getAll)
router.post('/', [verified, upload.single('avatar')], articleController.create)
router.post('/:id', [verified, isAdmin], articleController.delete)
router.put('/:id', verified, articleController.update)

export { router }
