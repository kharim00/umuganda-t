const { DataTypes } = require("sequelize");
const sequelize = require("../../config/DB.js").sequelize;

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  date: DataTypes.DATE,
  location: DataTypes.STRING,
  created_by: DataTypes.UUID,
});

module.exports = Event;
