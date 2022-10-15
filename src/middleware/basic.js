"use strict";

const base64 = require("base-64");
const { users } = require("../models/index");

module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);
  if (!req.headers.authorization) {
    next();
    return _authError();
  }

  let basic = req.headers.authorization.split(" ").pop();
  // "username:password"
  // username, password
  let [username, pass] = base64.decode(basic).split(":");
  try {
    req.user = await users.authenticateBasic(username, pass);

    next();
  } catch (e) {
    console.error(e);
    res.status(403).send("Invalid Login");
  }
};
