const validator = require("validator");

const validSignupData = (req) =>{
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName||!lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email id is not valid");
        
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
        
    }
};

const validLoginData = (req)=>{
    const{emailId,password} = req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("email id is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
        
    }
}

module.exports = {
     validSignupData,validLoginData
}