const next = require("next")
const async = require("async")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const categoryController = require("./api/categories/category.controller")
const postController = require("./api/posts/post.controller")

const handleNormalRequest = (req, res) => {
  if (dev) {
    const handleDev = req.app.getRequestHandler()
    return handleDev(req, res)
  }
  return handle(req, res)
}

const handleNextRequest = (req, res) => {
  const pathname = req.route.path
  const splittedPathname = pathname.split("/")
  const pathList = splittedPathname.filter(ele => ele.length > 0 && ele[0] !== ":")
  const path = "/".concat(pathList.join("/"))

  if (dev) return req.app.render(req, res, path, req.params)
  return app.render(req, res, path, req.params)
}

const middlewareGetHomepage = (req, res, next) => {
  async.parallel({
    categories: (callback) => {
      categoryController._getListOfCategories((err, result) => {
        if (err) return callback(err)
        return callback(null, result)
      })
    },
    posts: (callback) => {
      postController._getListOfPosts((err, result) => {
        if (err) return callback(err)
        return callback(null, result)
      })
    }
  }, (err, result) => {
    if (err) {
      req._err = err
      return next()
    }

    req._toClient = result
    return next()
  })
}

const middlewareGetSinglePost = (req, res, next) => {
  const { postSlug } = req.params

  postController._getSinglePost(postSlug, (err, { success, doc, msg }) => {
    if (err || success === false) {
      req._err = err
      req._err.msg = msg
      return next()
    }

    req._post = doc
    return next()
  })
}

const handleGetPostPage = (req, res) => {
  if (dev) return req.app.render(req, res, '/posts', req.params)
  return app.render(req, res, '/posts', req.params)
}

module.exports = {
  handleNormalRequest,
  handleNextRequest,
  middlewareGetHomepage,
  handleGetPostPage,
  middlewareGetSinglePost
}