const express = require("express");
const { userAuth } = require("../middlewares/auth");
const UserRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName gender age photoURL Skills about";
UserRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId",USER_SAFE_DATA);
    const data = requests;
    res.json({ message: "you have got following requests", data });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

UserRouter.get("/user/requests/connections",userAuth,async (req,res)=>{
    try{
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
      $or:[{fromUserId: loggedInUser._id}, 
         {toUserId: loggedInUser._id}
        ],
        status:"accepted",
    }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
   
    const data = connections.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId;
        }
        else
        {return row.fromUserId}
    });
    
    res.json({message:"All the connections are fetched", data});
}
catch(err){
    res.status(400).send("Error "+err.message);
}
})

UserRouter.get("/feed",userAuth,async(req,res)=>{
    try{
       const loggedInUser = req.user;
        
       const page = parseInt(req.query.page)||1;
       let limit = parseInt(req.query.limit)||20;
       limit = limit > 50 ? 50 : limit;
       const skip = (page-1)*limit;
       const connectionRequests = await ConnectionRequestModel.find({
        $or:[
            {fromUserId: loggedInUser._id},
            {toUserId: loggedInUser._id}
        ]
       }).select("fromUserId toUserId");

       const hideUserFromFeed = new Set();
       connectionRequests.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId);
        hideUserFromFeed.add(req.toUserId);
       });
       
       const users = await User.find({
         $and:[
            {_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne: loggedInUser._id}},
        ]
       }).select(USER_SAFE_DATA).skip(skip).limit(limit);

       res.send(users);
    }
    catch(err){
        res.status(400).send("Error"+err.message);
    }
})

module.exports = UserRouter;
