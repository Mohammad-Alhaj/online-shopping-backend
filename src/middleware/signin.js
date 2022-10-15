"use strict";

const express = require("express");
const authRouter = express.Router();

const basicAuth = require("./basic.js");

authRouter.post("/signin", basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = authRouter;
