const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {validSignupData,validLoginData} = require("../utils/validation")
const authRouter = express.Router();


authRouter.post("/login", async (req, res) => {
    try {
      validLoginData(req);
      const { emailId, password } = req.body;
  
      const user = await User.findOne({ emailId: emailId });
      if (!user) {
        throw new Error("invalid credentials");
      }
  
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        throw new Error("invalid credentials");
      }
  
      const token = await user.getJWT();
      res.cookie("token", token, { maxAge: 180000000, httpOnly: true }); 
  
    
      res.status(200).json({
        message: "log in successful",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          photoURL: user.photoURL,
          about:user.about,
           age:user?.age,
           gender:user?.gender,
        },
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
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

authRouter.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.send("logout successful");
});

module.exports = authRouter;