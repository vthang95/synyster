const express = require("express")
const Router = express.Router()

const postController = require("./post.controller")

Router.get("/", postController.getListOfPosts)
Router.get("/:postSlug", postController.getSinglePost)
Router.post("/", postController.createPost)
Router.put("/:postId/hide", postController.hidePost)
Router.put("/:postId", postController.editPost)
Router.delete("/:postId", postController.deletePost)

module.exports = Router