const express = require('express');

const app = express();

const connectDB = require("./config/database");



connectDB().then(()=>{
    console.log("DataBase connection established");
    
app.listen(3000,()=>{
    console.log("server is successfully on the port 3000")
});
})
.catch((err)=>{
    console.log("Database cannot connected");
});





