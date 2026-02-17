require("dotenv").config()

const mongoose = require("mongoose");
const ConnecttoDB = require("./src/config/database")


const app = require("./src/app")
ConnecttoDB()

app.listen(3000,(req,res)=>{
    console.log("server running on port 3000")
})