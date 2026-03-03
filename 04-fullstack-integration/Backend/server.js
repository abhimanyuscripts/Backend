require('dotenv').config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")


connectToDB()


app.listen(3000,(req,res)=>{
    console.log("Running on port 3000")
})