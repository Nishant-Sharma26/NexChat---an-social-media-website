const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const {validSignupData,validLoginData} = require("./utils/validation")
const bcrypt = require("bcrypt");
app.use(express.json());

app.post("/signup", async (req, res) => {
    
    
  try {
    validSignupData(req);
    const {firstName,lastName,emailId,password} = req.body;
    
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
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
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error("invalid credentials");
        }
        else{
            res.send("log in successful");
        }

    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) res.status(400).send("user not found");
    else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    
  const ALLOWED_UPDATES = [
    "photoURL",
    "firstName",
    "lastName",
    "age",
    "about",
    "gender",
    "Skills",
    "password",
   
  ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
        ALLOWED_UPDATES.includes(k)
      );
      if(!isUpdateAllowed){
         throw new Error("update not allowed");
      }
      if(data?.Skills?.length>10){
        throw new Error("skills cannot be more than 10");
        
      }
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      returnDocument: "after",
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

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
