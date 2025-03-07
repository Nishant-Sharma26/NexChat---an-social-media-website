const mongoose = require("mongoose");  // Imports the Mongoose library

const connectDB = async () => {  // Defines an async function to handle DB connection
  mongoose.connect(
    "mongodb+srv://nishusharma1817:iCldOONdhQbKPInG@namastenode.lsiem.mongodb.net/NexChat"
  );
};

module.exports = connectDB;  