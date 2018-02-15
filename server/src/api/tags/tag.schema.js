const mongoose = require("mongoose")

const TagSchema = new mongoose.Schema({
  name : { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "posts" }]
}, { timestamps: true })

module.exports = mongoose.model("tags", TagSchema)