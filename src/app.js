const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");

const app = express();
const cookiesParser = require("cookie-parser");

app.use(express.json());
app.use(cookiesParser());

// Configure CORS with specific origin and credentials support
app.use(cors({
  origin: 'http://localhost:5174', // Explicitly allow this origin
  credentials: true // Allow cookies/credentials to be sent
}));

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const UserRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", UserRouter);

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