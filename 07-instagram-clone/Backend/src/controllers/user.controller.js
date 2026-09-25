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

    const existingRequest = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
    })

    if (existingRequest) {
    return res.status(200).json({
        message: `Follow request already exists with status: ${existingRequest.status}`
    })
    }



    const followRecord = await followModel.create({
        follower : followerUsername,
        followee : followeeUsername
    })

    res.status(201).json({
        message : `Follow request sent to ${followeeUsername}`,
        follow : followRecord
    })
}

async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower : followerUsername,
        followee : followeeUsername,
         status: "accepted"
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

async function getFollowRequestsController(req, res) {

    const username = req.user.username

    const requests = await followModel.find({
        followee: username,
        status: "pending"
    })

    res.status(200).json({
        requests: requests
    })
}

async function acceptFollowRequestController(req, res) {

    const requestId = req.params.requestId
    const username = req.user.username

    const request = await followModel.findOne({
        _id: requestId,
        followee: username,
        status: "pending"
    })

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    request.status = "accepted"

    await request.save()

    res.status(200).json({
        message: `You accepted ${request.follower}'s follow request`,
        request: request
    })
}

async function rejectFollowRequestController(req, res) {

    const requestId = req.params.requestId
    const username = req.user.username

    const request = await followModel.findOne({
        _id: requestId,
        followee: username,
        status: "pending"
    })

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    request.status = "rejected"

    await request.save()

    res.status(200).json({
        message: `You rejected ${request.follower}'s follow request`,
        request: request
    })
}

async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password")
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "Current user fetched successfully",
        user
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    getFollowRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController,
    getMeController
}