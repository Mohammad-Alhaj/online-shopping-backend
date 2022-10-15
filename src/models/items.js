"use strict";


const items = (sequelize, DataTypes) => {
  const model = sequelize.define("items", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userID: {
      type: DataTypes.INTEGER,
    },
  });

  return model;
};
module.exports = items;
