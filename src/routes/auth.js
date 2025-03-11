const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {validSignupData,validLoginData} = require("../utils/validation")
const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
    try {
      validSignupData(req);
      const {firstName,lastName,emailId,password} = req.body;
      
      const passwordHash = await bcrypt.hash(password,10);
     
      const user = new User({
          firstName,
          lastName,
          emailId,
          password:passwordHash,
      });
      await user.save();
      res.send("user added successfully");
    } catch (err) {
      res.send("Error :"+err.message);
    }
  });
  
authRouter.post("/login",async(req,res)=>{
      try{
          validLoginData(req);
          const{emailId,password} = req.body;
          
          const user = await User.findOne({emailId:emailId});
          if(!user){
              throw new Error("invalid credentials");   
          }
          const isPasswordValid = await user.validatePassword(password);
          if(!isPasswordValid){
              throw new Error("invalid credentials");
          }
          else{
              const token = await user.getJWT();
              res.cookie("token",token,{ maxAge: 180000000});
              res.send("log in successful");
          }
  
      }
      catch(err){
          res.status(400).send("Error: "+err.message);
      }
  })
module.exports = authRouter;