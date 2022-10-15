"use strict";

const favList = (sequelize, DataTypes) =>
  sequelize.define("favList", {
    addToFiv: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    itemID: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = favList;
