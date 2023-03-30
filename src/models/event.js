const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("event", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    user: {type: DataTypes.STRING, allowNull: false, required: true, trim: true},
    eventType: {type: DataTypes.STRING, allowNull: false, required: true, trim: true}
  } );
  return Events;
};