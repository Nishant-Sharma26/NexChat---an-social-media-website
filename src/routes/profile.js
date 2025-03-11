const express = require("express");
const {userAuth} = require("../middlewares/auth");
const profile = express.Router();

profile.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.send("Error"+err.message);
    }
})


module.exports = profile;