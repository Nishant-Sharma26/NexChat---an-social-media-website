const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ValidateEditProfileData } = require("../utils/validation");
const profile = express.Router();

profile.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("Error" + err.message);
  }
});
profile.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateEditProfileData(req)) {
      throw new Error("request invalid edits");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.send(loggedInUser.firstName + " your profile has been updated");
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

module.exports = profile;
