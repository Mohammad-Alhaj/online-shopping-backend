"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign(
          {
            id: this.id,
            username: this.username,
            email: this.email,
          },
          process.env.SECRET
        );
      },
    },
  });
  

  model.beforeCreate = async function (user) {
    let hashedPass = await bcrypt.hash(user.password, 10);
    return hashedPass;
  };

  // basic
  model.authenticateBasic = async function (username, password) {
    const user = await model.findOne({
      where: {
        username: username,
      },
    });

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error("Invalid User");
  };

  // Bearer
  model.authenticateToken = async function (token) {
    try {
      const verifyToken = jwt.verify(token, process.env.SECRET);
 
      const user = await this.findOne({
        where: {
          username: verifyToken.username,
        },
      });
      if (user) {
        return user;
      }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return model;
};

module.exports = userSchema;
