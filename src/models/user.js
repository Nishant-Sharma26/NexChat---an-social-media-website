const mongoose = require('mongoose');
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:2,
    },
    lastName: {
        type:String
    
    },
    emailId: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email :"+value);
                
            }
        }

    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong");
                
            }
        }
    },
    age: {
        type: Number,
        min:18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not available");
            }
        },
    },
    photoURL:{
         type: String,
         default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRrWgjZtjvfCpKF-uof_08e89WR9269oYsA&s",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL");
                
            }
        }
    },
    Skills:{
         type: [String]
    },
    about:{
        type: String,
        default: "Hii I am using NexChat",
    },
   

},{
    timestamps:true,
});

const User = mongoose.model("User",userSchema);

module.exports = User; 
