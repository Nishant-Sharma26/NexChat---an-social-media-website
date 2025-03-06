const mongoose = require("mongoose");

const connectDB = async () => {

mongoose.connect(
  "mongodb+srv://nishusharma1817:iCldOONdhQbKPInG@namastenode.lsiem.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode/NexChat"
);

};

module.exports = connectDB;




