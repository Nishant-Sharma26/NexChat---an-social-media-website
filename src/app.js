const express = require('express');

const app = express();
app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.use("/home",(req,res)=>{
    res.send("hello hello helloo!");
})

app.use("/tes",(req,res)=>{
    res.send("hii my name is nishant");
})
app.listen(3000,()=>{
    console.log("server is successfully on the port 3000")
});
