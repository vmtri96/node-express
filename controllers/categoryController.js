import { Category } from '../models/index.js'
import { User } from '../models/index.js'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const categoryController = {}

categoryController.getAll = (req, res) => {
  Category.find().then(async categories => {
    let result = []
    for (let category of categories) {
      let user = await User.findById(category.creator)
      result.push({ name: category.name, creator: user.username })
    }
    return res.json({categories: result})
  })
}

categoryController.create = (req, res) => {
  let category = new Category()
  if (!req.body.name) return res.json({message: 'No value'})
  User.findOne({email: req.email}).then(user => {
    category.name = req.body.name
    category.creator = user._id
    category.save().then(() => res.json({message: 'Create successfully'}))
  })
}

categoryController.update = (req, res) => {
  Category.findById(req.params.id).then(category => {
    if (!category) return res.json({message: 'Category not found'})
    if (!req.body.name) return res.json({message: 'No value to update'})
    category.name = req.body.name
    category.save().then(() => res.json({message: 'Update successfully'}))
  })
}

categoryController.delete = (req, res) => {
  Category.findById(req.params.id).then(category => {
    if (!category) return res.json({message: 'Category not found'})
    return category.deleteOne({'_id': ObjectId(req.params.id)}, function(err) {
      if (err) return res.json({message: err})
      return res.json({message: 'Delete successfully'})
    })
  })
}

export { categoryController }
