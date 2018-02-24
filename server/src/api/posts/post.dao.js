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

const getSinglePostBySlug = (slug, callback) => {
  PostModel
    .findOne({ slug })
    .exec((err, doc) => {
      if (err) return callback(err, { success: false, status: 422, msg: 'An error occurred when loading post!', errors: err })
      if (!doc) return callback(null, { success: false, status: 200, msg: 'This post is not exist', errors: null })
      if (doc.isDeleted === true) return callback(null, { success: false, status: 204 })
      return callback(null, { success: true, status: 200, msg: null, doc })
    })
}

const updatePostById = (post, callback) => {
  PostModel
    .findOneAndUpdate(
      { _id: post._id, isDeleted: false },
      { $set: { title: post.title, slug: post.slug, content: post.content, category: post.categoryId } },
      { new: true }
    )
    .exec((err, doc) => {
      if (err) return callback(err, { success: false, status: 422, msg: 'Some error occurred!', errors: err })
      if (!doc) return callback(null, { success: false, status: 200, msg: 'This post is not exist', errors: null })
      return callback(null, { success: true, status: 200, msg: null, doc })
    })
}


module.exports = {
  getPosts,
  getSinglePostBySlug,
  updatePostById
}
