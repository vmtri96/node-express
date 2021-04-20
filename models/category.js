import mongoose from 'mongoose'
const { Schema } = mongoose

const CategorySchema = new Schema({
  name: String,
  creator: Schema.Types.ObjectId
})

const Category = mongoose.model('Category', CategorySchema)

export { Category }
