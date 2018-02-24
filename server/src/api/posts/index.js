const express = require("express")
const Router = express.Router()

const postController = require("./post.controller")
const auth = require("../../authentication")

Router.get("/", postController.getListOfPosts)
Router.get("/:postSlug", postController.getSinglePost)
Router.post("/", auth.isAuthApi, postController.createPost)
Router.put("/:postId/hide", auth.isAuthApi, postController.hidePost)
Router.put("/:postId", auth.isAuthApi, postController.editPost)
Router.delete("/:postId", auth.isAuthApi, postController.deletePost)

module.exports = Router