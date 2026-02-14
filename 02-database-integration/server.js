require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

function ConnecttoDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected Sucessfully")
    })
}

ConnecttoDB()
app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})
