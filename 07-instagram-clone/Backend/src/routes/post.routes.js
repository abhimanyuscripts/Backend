const express = require("express")
const postRouter = express.Router()
const createPostController = require("../controllers/post.controller")

postRouter.post("/",createPostController)

module.exports = postRouter
