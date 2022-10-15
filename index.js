"use strict";
const server = require("./src/server");
require("dotenv").config();
const PORT = process.env.PORT;


const { sequelize } = require("./src/models/index");

sequelize.sync().then(() => {
  server.start(PORT);
});
