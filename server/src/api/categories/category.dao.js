const CategoryModel = require("./category.schema")

const getCategories = callback => {
  CategoryModel
    .find({ isDeleted: false })
    .exec((err, docs) => {
      if (err) return callback(err, { success: false, msg: "Something went wrong", errors: err })
      if (docs.length === 0) return callback(null, { success: false, msg: "There is no category to show", errors: null })
      return callback(null, { success: true, docs })
    })
}

module.exports = {
  getCategories
}
