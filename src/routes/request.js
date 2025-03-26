const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      
      const allowedStatus = ["ignored","interested"];
      if(!allowedStatus.includes(status)){
         return res.status(400).json({message: "Invalid status type :"+status})
      }
   
     const user = await User.findById(toUserId);
     
     if(!user){
         throw new Error("user is not found")
     }

    const existingConnectionRequests = await ConnectionRequestModel.findOne({
        $or: [
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ],
    });

    if(existingConnectionRequests){
        throw new Error("connection request already exist");
    }

    const ConnectionRequest = new ConnectionRequestModel({
          fromUserId,
          toUserId,
          status,
      });

      const data = await ConnectionRequest.save();

      res.json({
        message:"Connection Request sent successfully",
        data,
      });
    } catch (err) {
      res.status(400).send("Error " + err.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try{
    const loggedInUser = req.user;
    const {requestId,status} = req.params;

    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)){
      throw new Error("status is invalid");
    }
    
    const connectionRequest = await ConnectionRequestModel.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested",
    }); 

    if(!connectionRequest){
      throw new Error("the connection request does not exist");
    }

     connectionRequest.status = status;
     const data = await connectionRequest.save();
     res.json({message:"the connection request has been "+ status,data})

  }
  catch(err){
     res.status(400).send("Error"+err.message);
  }


})

module.exports = requestRouter;
