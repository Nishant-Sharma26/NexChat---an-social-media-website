const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["accepted","rejected","ignored","interested"],
            message:`{VALUE} is incorrect status type `
        },
    },

},
{
    timestamps: true,
}
);


connectionRequestSchema.pre("save",async function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("you can not send connection request to yourself");
        
    }
     next();
})

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;