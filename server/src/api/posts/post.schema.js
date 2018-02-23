const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  content: { type: String },
  isDeleted: { type: Boolean, default: false },
  isHidden: { type: Boolean, default: false },
  tags: [{ type: Schema.Types.ObjectId, ref: "tags" }]
}, { timestamps: true })

module.exports = mongoose.model("posts", PostSchema)