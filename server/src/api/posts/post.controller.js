const getSlug = require("speakingurl")

// TODO: move all schemas to dao
const Post = require("./post.dao")
const PostSchema = require("./post.schema")

const getListOfPosts = (req, res) => {
  Post.getPosts((err, result) => {
    if (err) return res.json(result)
    return res.json(result)
  })
}

const _getListOfPosts = (callback) => {
  Post.getPosts((err, result) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, result.docs)
  })
}

const getSinglePost = (req, res) => {
  const { postSlug } = req.params

  Post.getSinglePostBySlug(postSlug, (err, { success, status, msg, errors, doc }) => {
    if (err || success === false) return res.status(status).json({ success, msg, errors })
    return res.status(200).json({ success, msg, doc })
  })
}

const _getSinglePost = (postSlug, callback) => {
  Post.getSinglePostBySlug(postSlug, (err, { success, status, msg, errors, doc }) => {
    if (err) return callback(err, null)
    return callback(null, { success, status, msg, doc })
  })
}

const createPost = (req, res) => {
  req.checkBody("title", "Post title is required!").notEmpty()
  const errors = req.validationErrors(req)
  if (errors) return res.status(422).json({ success: false, msg: "Bad Argument", errors })

  const { title, content, category } = req.body
  const data = {
    title,
    content: content || "",
    slug: getSlug(title, { lang: process.env.SITE_LANGUAGE || "vn" }),
    createdBy: req.user._id,
    category: category
  }

  const post = new PostSchema(data)
  post.save((err, doc) => {
    if (err) return res.status(422).json({ success: false, msg: "Cannot create post", errors: err })
    return res.status(201).json({ success: true, msg: "Success!", post: doc })
  })
}

const editPost = (req, res) => {
  req.checkBody('title', 'Post title is required').notEmpty()

  const errors = req.validationErrors(req)
  if (errors) return res.status(422).json({ success: false, msg: 'Bad Argument', errors })

  const createdBy = req.user._id
  const postId = req.params.postId
  const { title, content, category } = req.body
  const post = {
    _id: postId,
    title,
    content,
    category,
    createdBy,
    slug: getSlug(title, { lang: process.env.SITE_LANGUAGE || "vn" })
  }

  Post.updatePostById(post, (err, { success, status, msg, errors, doc }) => {
    if (err || success === false) return res.status(status).json({ success, msg, errors })
    return res.status(200).json({ success, msg, doc })
  })
}

const deletePost = (req, res) => {}

const hidePost = (req, res) => {}

module.exports = {
  getListOfPosts,
  _getListOfPosts,
  getSinglePost,
  _getSinglePost,
  createPost,
  editPost,
  deletePost,
  hidePost
}