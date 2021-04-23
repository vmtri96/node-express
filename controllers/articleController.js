import { Article, User } from '../models/index.js'
import { unlink } from 'fs'
import path from 'path'
import slug from 'slug'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types

const articleController = {}
const __dirname = path.resolve();

articleController.getAll = (req, res) => {
  Article.find({}, async (err, articles) => {
    if (err) return res.json({message: err})
    let result = []
    for (let article of articles) {
      let user = await User.findById(article.author)
      result.push({
        title: article.title,
        slug: article.slug,
        content: article.content,
        author: user.username,
        avatar: article.avatar,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt
      })
    }
    return res.json({articles: result})
  })
}

articleController.create = (req, res) => {
  if (!req.body.title) return res.json({message: 'Title is required'})
  if (!req.body.content) return res.json({message: 'Content is required'})
  if (req.fileValidationError) return res.json({message: req.fileValidationError})
  let article = new Article()
  User.findOne({ email: req.email }, (err, user) => {
    article.title = req.body.title
    article.slug = slug(req.body.title)
    article.content = req.body.content
    article.author = user._id
    article.avatar = {
      name: req.file.filename,
      path: req.file.destination + req.file.filename
    }
    article.save().then(() => {
      res.json({message: 'Create successfully', article: article})
    })
  })
}

articleController.delete = (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (!article) return res.json({message: 'Article not found'})
    unlink(article.avatar.path, err => {
      if (err) console.log(err)
      Article.deleteOne({'_id': ObjectId(req.params.id)}, err => {
        if (err) res.json({message: err})
        return res.json({message: 'Delete successfully'})
      })
    })
  })
}

articleController.update = (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (!article) return res.json({message: 'Article not found'})
    if (req.body.title) {
      article.title = req.body.title
      article.slug = slug(req.body.title)
    }
    if (req.body.content) article.content = req.body.content
    return article.save(
      () => { res.json({message: 'Update successfully'}) }
    )
  })
}

export { articleController }
