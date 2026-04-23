const { DataTypes } = require("sequelize");
const sequelize = require("../../config/DB.js").sequelize;

const Fine = sequelize.define("Fine", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: DataTypes.UUID,
  event_id: DataTypes.UUID,
  amount: DataTypes.INTEGER,
  reason: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("paid", "unpaid"),
    defaultValue: "unpaid",
  },
});

module.exports = Fine;
