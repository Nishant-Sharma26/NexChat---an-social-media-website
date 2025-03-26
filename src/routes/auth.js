const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validSignupData, validLoginData } = require("../utils/validation");
const authRouter = express.Router();

authRouter.post("/signup",async(req,res)=>{
   try{
        validSignupData(req);
        const {firstName,lastName,emailId,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
     
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        const savedUser = await user.save();
        const token = await user.getJWT();
        res.cookie("token", token, {
            maxAge: 180000000, // ~2 days
            httpOnly: true, // Prevent client-side access to cookie
        });

        res.status(200).json({
          message: "Login successful",
          user: {
              firstName: user.firstName,
              lastName: user.lastName,
              emailId: user.emailId,
              photoURL: user.photoURL,
              about: user.about,
              age: user?.age,
              gender: user?.gender,
          },
      });

  
   }
   catch(err){
    res.status(400).send("Error :"+err.message);
   }
})
authRouter.post("/login", async (req, res) => {
    try {
        validLoginData(req); // Validate request body
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const token = await user.getJWT();
        res.cookie("token", token, {
            maxAge: 180000000, // ~2 days
            httpOnly: true, // Prevent client-side access to cookie
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                photoURL: user.photoURL,
                about: user.about,
                age: user?.age,
                gender: user?.gender,
            },
        });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).send("Logout successful");
});

module.exports = authRouter;