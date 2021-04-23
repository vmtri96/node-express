import mongoose from 'mongoose'
const { Schema } = mongoose

const ArticleSchema = new Schema({
  title: String,
  slug: String,
  content: String,
  author: mongoose.Types.ObjectId,
  avatar: {
    name: String,
    path: String
  }
}, { timestamps: true })

const Article = mongoose.model('Article', ArticleSchema)

export { Article }
