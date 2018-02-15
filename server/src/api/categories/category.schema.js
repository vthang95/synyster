const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  isActived: { type: Boolean, default: true }
  posts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
}, { timestamps: true })

module.exports = mongoose.model("categories", CategorySchema)