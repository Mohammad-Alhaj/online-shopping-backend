"use strict";

require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

// Tables
const usersModel = require("./users");
const itemsModel = require("./items");
 const favListModel = require("./favList");
const cartModel = require("./cart");
const commentsModel = require("./comments");


const DATABASE_URL = process.env.NODE_ENV === "test" ? "sqlite::memory" : process.env.DATABASE_URL;

const DATABASE_CONFIG =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const items = itemsModel(sequelize, DataTypes);
const favList = favListModel(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);
const cart = cartModel(sequelize, DataTypes);
const comments = commentsModel(sequelize, DataTypes);

//....relationships one to many........
// service
users.hasMany(items, {
  foreignKey: "userID",
  sourceKey: "id",
});
items.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});

// favList
users.hasMany(favList, {
  foreignKey: "userID",
  targetKey: "id",
});
favList.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});
items.hasMany(favList, {
  foreignKey: "itemID",
  targetKey: "id",
});
favList.belongsTo(items, {
  foreignKey: "itemID",
  targetKey: "id",
});
// cart
users.hasMany(cart, {
  foreignKey: "userID",
  targetKey: "id",
});
cart.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});
items.hasMany(cart, {
  foreignKey: "itemID",
  targetKey: "id",
});
cart.belongsTo(items, {
  foreignKey: "itemID",
  targetKey: "id",
});





//***********comments************ */
users.hasMany(comments, {
  foreignKey: "userID",
  targetKey: "id",
});
comments.belongsTo(users, {
  foreignKey: "userID",
  targetKey: "id",
});



items.hasMany(comments, {
  foreignKey: "itemID",
  targetKey: "id",
});
comments.belongsTo(items, {
  foreignKey: "itemID",
  targetKey: "id",
});


module.exports = {
  sequelize: sequelize,
  users: users,
  items: items,
  favList: favList,
  comments:comments,
  cart:cart,
};
