"use strict";
require("dotenv").config();
const express = require("express");
const app = express();

const handle500 = require("./error-handlers/500");
const handle404 = require("./error-handlers/404");
const router = require("./routers/api");
const login = require("./middleware/signin");
const signup = require("./middleware/signup");
const routerCart = require("./routers/cart");


const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Online Shopping");
});




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("", signup);
app.use("/", login);
app.use('',routerCart)
app.use("/api", router);
app.use(handle500);
app.use("*", handle404);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`lesson in PORT ${PORT}`);
  });
}
module.exports = {
  app: app,
  start: start,
};
