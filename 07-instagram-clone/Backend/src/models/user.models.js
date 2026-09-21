const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true , "Username already exists"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true , "Email already exists"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    bio:{type:String},
    profileImage:{type:String,default:"https://ik.imagekit.io/dwe8ayord/blank-profile-picture-973460_960_720.png"},
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel