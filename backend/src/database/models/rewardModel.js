const { DataTypes } = require("sequelize");
const sequelize = require("../../config/DB.js").sequelize;

const Reward = sequelize.define("Reward", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: DataTypes.UUID,
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  badge: DataTypes.STRING,
});

module.exports = Reward;
