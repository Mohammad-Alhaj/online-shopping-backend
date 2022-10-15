"use strict";

const cart = (sequelize, DataTypes) =>
  sequelize.define("cart", {
    addToCart: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    amount: { type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    itemID: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = cart;
