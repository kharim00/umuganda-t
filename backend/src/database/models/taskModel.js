const { DataTypes } = require("sequelize");
const sequelize = require("../../config/DB.js").sequelize;

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  event_id: DataTypes.UUID,
  assigned_to: DataTypes.UUID,
  description: DataTypes.STRING,
  zone: DataTypes.STRING,
});

module.exports = Task;
