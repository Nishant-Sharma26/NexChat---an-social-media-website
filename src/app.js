const express = require('express');
const connectDB = require("./config/database");
const User = require('./models/user');
const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{

    // creating a new instance of user model
    const userObj = req.body;

    const user = new User(userObj);
    
    await user.save();
    res.send("user added successfully");
  
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





