const mongoose = require("mongoose")

function ConnecttoDB(){
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected")
     })
}


module.exports = ConnecttoDB