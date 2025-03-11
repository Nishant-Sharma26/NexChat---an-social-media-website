const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {userAuth} = require("./middlewares/auth");
const app = express();
const cookiesParser = require("cookie-parser");
const {validSignupData,validLoginData} = require("./utils/validation")
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cookiesParser());



app.post("/signup", async (req, res) => {
    
    
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

app.post("/login",async(req,res)=>{
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


app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.send("Error"+err.message);
    }
})

app.post("/sendConnectionRequest",userAuth,(req,res)=>{
    const user = req.user;
    res.send("connection request has been sent by "+user.firstName);
})
  
connectDB()
  .then(() => {
    console.log("DataBase connection established");

    app.listen(3000, () => {
      console.log("server is successfully on the port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot connected");
  });
