const express = require("express")
const app = express()
app.use(express.json())

const authRouter = require("./routes/auth.routes")
app.use("/api/auth",authRouter)

const postRouter = require("../src/routes/post.routes")
app.use("api/posts",postRouter)

const cookieParser = require("cookie-parser")
app.use(cookieParser)


module.exports = app
