"use strict";

const { users } = require("../models/index");
module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      next("Invalid Login");
    }
    const token = req.headers.authorization.split(" ").pop();

    let bearer = await users.authenticateToken(token);

    req.user = bearer;

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send("Invalid Login");
  }
};
