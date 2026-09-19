const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const connectToDB = require("./config/database")
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth.routes");
app.use("/api/auth",authRouter)

 
connectToDB()





module.exports = app