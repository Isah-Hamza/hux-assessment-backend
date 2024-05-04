const express = require("express");
const router = express.Router();
const { hashPassword, comparePassword, generateAccessToken } = require("../utilities/functions");
// const User = require("../models/userModel");
// const Account = require("../models/account");
const users = require('../data/dummyUsers');

router.post("/login", async (req, res) => {
   
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  const userEmail = users.findIndex((user) => user.email === data.email);
  if (userEmail < 0)
    return res.status(400).json({ message: "Incorrect email provided" });
  const user = users[userEmail];
  if ( user.password == data.password) {
    const token = generateAccessToken(user);
    return res.status(200).json({ user, message: "login successful", token });
  } else {
    return res.status(400).json({ message: "Incorrect password" });
  }
});

module.exports = router;
