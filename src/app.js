const express = require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{

   try{
    const userObj = req.body;

    const user = new User(userObj);
    
    await user.save();
    res.send("user added successfully");
   }
   catch(err){
        res.send(err.message);
   }
  
});

app.get("/user",async(req,res)=>{
     const userEmail = req.body.emailId;

     try{
        const users = await User.find({emailId:userEmail});
        if(users.length===0)res.status(400).send("user not found")
        else
           {res.send(users);}
     }
     catch(err){
        res.status(400).send("something went wrong");
     }
     
});

app.get("/feed",async(req,res)=>{
   

    try{
       const users = await User.find({});
       res.send(users)
    }
    catch(err){
       res.status(400).send("something went wrong");
    }
    
});

app.delete("/delete",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id:userId});
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
});

app.patch("/update",async(req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
    
    try{
        const user = await User.findByIdAndUpdate(userId,data,{
            runValidators:true,returnDocument:"after",
        });
        res.send("user updated successfully");
    }
    catch(err){
         res.status(400).send(err.message);
    }
});






connectDB().then(()=>{
    console.log("DataBase connection established");
    
app.listen(3000,()=>{
    console.log("server is successfully on the port 3000")
});
})
.catch((err)=>{
    console.log("Database cannot connected");
});





