const dbConfig = require("../config/dbConfig");

console.log(dbConfig);

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("err" + err.message);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("../models/event")(sequelize, DataTypes);

db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    console.log("yes re-sync done!");
  });

module.exports = db;