const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const userController = require("../controllers/user.controller")
const userRouter = express.Router()

userRouter.post("/follow/:username" ,identifyUser, userController.followUserController)
userRouter.post("/unfollow/:username" ,identifyUser,userController.unfollowUserController)
userRouter.get(
    "/follow-requests",
    identifyUser,
    userController.getFollowRequestsController
)
userRouter.patch(
    "/follow-request/accept/:requestId",
    identifyUser,
    userController.acceptFollowRequestController
)
userRouter.patch(
    "/follow-request/reject/:requestId",
    identifyUser,
    userController.rejectFollowRequestController
)

userRouter.get(
    "/get-me",
    identifyUser,
    userController.getMeController
)

module.exports = userRouter
