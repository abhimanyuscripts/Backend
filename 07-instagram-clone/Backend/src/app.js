const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(cookieParser())

//Require Router
const authRouter = require("./routes/auth.routes")
const postRouter = require("../src/routes/post.routes")
const userRouter = require("./routes/user.routes")

//Use Routes 
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use("/api/follower",userRouter) 



module.exports = app
