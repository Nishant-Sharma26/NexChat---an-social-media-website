const jwt = require('jsonwebtoken');
const User = require("../models/user");

const userAuth = async(req,res,next) =>{
    try{
     const cookies = req.cookies;
     const {token} = cookies;
     if(!token){
        return res.status(400).send("invalid token please log In");
        
     }
    const decodedMessage = await jwt.verify(token,"NexChat@1817");
    const {_id} = decodedMessage;
    const user = await User.findById(_id);
    if(user){
        req.user = user;
        next();
    }
    else{
        throw new Error("User not found");
        
    }
}
catch(err){
     res.send("Error"+err.message);
}
};

module.exports = {
    userAuth
};