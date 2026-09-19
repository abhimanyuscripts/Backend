const express = require("express")
const userModel = require("../models/users.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
    const{name,email,password}=req.body
    const isUserExists = await userModel.findOne({email});


    if(isUserExists){
        return res.status(409).json({
            message : "user already exists",
        })
    }
    const hash = crypto.hash("md5").update(password).digest("hex")
    const user = await userModel.create({
        email,password : hash ,name
    })

    const token =  jwt.sign(
        {
            id:user._id,
            email : user.email
        },
        process.env.JWT_SECRET
)

    res.cookie("jwt_token",token)

    res.status(201).json({
        message : "User Registered",
        user,
        token
    })
})

authRouter.post("/login", async (req,res)=>{
    const { email , password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message : "User Not Found"
        })
    }
    const isPasswordMatched = user.password == crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatched){
        return res.status(401).json({
            message : "Incorrect Password"
        })
    }

    const token = jwt.sign({
        id : user._id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(200).json({
        message : "user logged in",
        user
    })
})

module.exports = authRouter