const PostModel = require("./post.schema")

const getPosts = callback => {
  PostModel
    .find({ isDeleted: false })
    .exec((err, docs) => {
      if (err) return callback(err, { success: false, msg: "Something went wrong", errors: err })
      if (docs.length === 0) return callback(null, { success: false, msg: "There is no post to show", errors: null })
      return callback(null, { success: true, docs })
    })
}

module.exports = {
  getPosts
}
