const express = require('express')
const Router = express.Router()

const categoryController = require('./category.controller')

Router.get('/', categoryController.getListOfCategories)
Router.put('/:categoryId', categoryController.editCategory)
Router.delete('/:categoryId', categoryController.deleteCategory)
Router.post('/', categoryController.createCategory)

module.exports = Router
