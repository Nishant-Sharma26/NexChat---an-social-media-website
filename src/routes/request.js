const express = require("express");
const {userAuth} = require("../middlewares/auth");
const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user = req.user;
    res.send("connection request has been sent by "+user.firstName);
})

module.exports = requestRouter;
