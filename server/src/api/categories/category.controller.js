const Category = require("./category.dao")

const getListOfCategories = (req, res) => {
  Category.getCategories((err, result) => {
    if (err) return res.json(result)
    return res.json(result)
  })
}

const putCategory = () => {}

const deleteCategory = () => {}

const postCategory = () => {}

module.exports = {
  getListOfCategories,
  putCategory,
  deleteCategory,
  postCategory
}