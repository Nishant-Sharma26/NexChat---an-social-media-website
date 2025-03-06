const express = require('express');

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth")

app.use("/admin",adminAuth);



app.use("/user",userAuth);


app.use("/user/getAllData",(req,res)=>{
    //DB call
    try{
    throw new Error("juio");
    
    res.send("user data is found");

    }
    catch(err){
        res.send("something wrong")
    }
})

app.use('/admin/getAllData',(req,res,next)=>{ 
  
        res.send("All data send");
});

app.use("/admin/deleteUser",(req,res,next)=>{
       res.send("deleting user");
})





app.listen(3000,()=>{
    console.log("server is successfully on the port 3000")
});
