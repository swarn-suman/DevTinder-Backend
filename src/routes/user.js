const express = require('express')
const userRouter = express.Router()

const { userAuth } = require("../middlewares/auth");
const  ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");


userRouter.get('/user/request/received', userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user
        
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: 'interested',
        }).populate('fromUserId', "firstName lastName age gender photoUrl about skills")

        res.json({messge: "Data Fetched successfully", data: connectionRequests})

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName photoUrl age gender about skills")
      .populate("toUserId", "firstName lastName photoUrl age gender about skills");

    console.log(connectionRequests);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

module.exports = userRouter