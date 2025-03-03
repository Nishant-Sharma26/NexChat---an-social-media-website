const express = require('express');

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Nishant",lastName:"Sharma"})
});

app.put("/user",(req,res)=>{
    res.send("data saved to database")
});

app.delete("/user",(req,res)=>{
    res.send("deleted successfully")
});

app.get("/user",(req,res)=>{
    res.send({firstName:"Nishant",lastName:"Sharma"})
});
app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.use("/home",(req,res)=>{
    res.send("hello hello helloo!");
})

app.use("/",(req,res)=>{
    res.send("hii my name is nishant");
})


app.listen(3000,()=>{
    console.log("server is successfully on the port 3000")
});
