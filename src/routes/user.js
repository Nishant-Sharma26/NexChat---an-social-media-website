const express = require("express");
const { userAuth } = require("../middlewares/auth");
const UserRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");

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

module.exports = UserRouter;
