"use strict";

const bcrypt = require("bcrypt");
const { users } = require("../models/index");
const express = require("express");
const authRouter = express.Router();
authRouter.post('/signup', async (req, res) => {
  
  try {
    const {email, username,password} =req.body
    console.log(email, username,password)
    const passwordhash = await bcrypt.hash(password, 10);

    const record = await users.create({ username: username, password: passwordhash, email: email,});
    
    res.status(201).json(record);

  } catch (err) {
    console.log(err);
  }
});

module.exports = authRouter;

//******************************* */

