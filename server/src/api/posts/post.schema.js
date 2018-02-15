const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String },
  isActived: { type: Boolean, default: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "tags" }]
}, { timestamps: true })

module.exports = mongoose.model("posts", PostSchema)