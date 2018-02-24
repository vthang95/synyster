const getSlug = require("speakingurl")

const Category = require("./category.dao")
const CategorySchema = require("./category.schema")

const getListOfCategories = (req, res) => {
  Category.getCategories((err, result) => {
    if (err) return res.json(result)
    return res.json(result)
  })
}

const _getListOfCategories = (callback) => {
  Category.getCategories((err, result) => {
    if (err) {
      return callback(err, null)
    }
    return callback(null, result.docs)
  })
}

const editCategory = (req, res) => {}

const deleteCategory = (req, res) => {}

const createCategory = (req, res) => {
  req.checkBody("name", "Category name is required!").notEmpty()
  const errors = req.validationErrors(req)

  if (errors) return res.status(422).json({ success: false, msg: "Bad Argument", errors })
  const { name, description, title } = req.body
  const data = {
    name,
    description: description || "",
    title: title || "",
    slug: getSlug(name, { lang: process.env.SITE_LANGUAGE || "vn" }),
    createdBy: req.user._id
  }

  let category = new CategorySchema(data)
  category.save((err, doc) => {
    if (err) return res.status(422).json({ success: false, msg: "Cannot create document", errors: err })
    return res.status(201).json({ success: true, msg: "Success!", category: doc })
  })
}

module.exports = {
  getListOfCategories,
  _getListOfCategories,
  editCategory,
  deleteCategory,
  createCategory
}