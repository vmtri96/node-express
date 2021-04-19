import { Category as db } from '../models/index.js'

const categoryController = {}

categoryController.getAll = (req, res) => {
  res.json({message: 'get all'})
}

export { categoryController }
