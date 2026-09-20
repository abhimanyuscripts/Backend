const userModel = require("../models/user.models")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


 async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body

    // const isUserExistsbyEmail = await userModel.findOne({email})

    // if(isUserExistsbyEmail){
    //     return res.status(409).json({message:"User already exists with this email"})
    // }
    // const isUserExistsbyUsername = await userModel.findOne({username})

    // if(isUserExistsbyUsername){
    //     return res.status(409).json({message:"User already exists with this username"})
    // }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409)
        .json(
            {message : "User already Exists" + (isUserAlreadyExists.email == email? "Email Already Exists" : "username Already Exists")}
        )
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const  user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password : hash
    })
    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn : '1d'})

    res.cookie("token",token)

    res.status(201).json({
        message : 'user registered',
        user : {
            email : user.email,
            username : user.username,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })
    
}

 async function loginCOntroller(req,res){
    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or:[{
            username : username
        },
        {
            email:email 
        },
        ]
    })
    if(!user){
        return res.status(404).json({
            message : "user Not Found"
        })
    }


    const hash = crypto.createHash('sha256').update(password).digest('hex')
    const isPasswordvalid = hash==user.password
    if(!isPasswordvalid){
        return res.status(401).json({
            message : "password is invalid"
        })
    }

    token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,{expiresIn : '1d'})

    res.cookie("token",token)

    res.status(200).json({
        message : "USer logged in ",
        user :{
            username : user.username,
            email : user.email,
            bio : user.bio,
            profileImage : user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginCOntroller
}