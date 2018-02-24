const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  isHidden: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdBy  : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
}, { timestamps: true })

module.exports = mongoose.model("categories", CategorySchema)