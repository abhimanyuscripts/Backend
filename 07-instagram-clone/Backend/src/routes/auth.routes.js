const express = require("express")
const authRouter = express.Router()
const cookie = require("cookie-parser")


const authController = require("../controllers/auth.controller")
authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginCOntroller)


module.exports = authRouter
