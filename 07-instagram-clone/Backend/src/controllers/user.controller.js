const followModel = require("../models/follow.model")
const userModel = require("../models/user.models")

async function followUserController (req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followerUsername == followeeUsername){
        return res.status(400).json({
            message : "You Cannot Follow Yourself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username : followeeUsername
    })
    if(!isFolloweeExists){
        return res.status(404).json({
            message : "User Doesn't Exists"
        })
    } 

    const isAlreadyFollowing = await userModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(200).json({
            message : "Already Following."
        })
    }


    const followRecord = await followModel.create({
        follower : followerUsername,
        followee : followeeUsername
    })

    res.status(201).json({
        message : `You are now following ${followeeUsername}`,
        follow : followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message : `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message : `You Have Unfollowed ${followeeUsername}`
    })

}

module.exports = {followUserController , unfollowUserController}