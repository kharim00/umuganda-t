const { DataTypes } = require("sequelize");
const sequelize = require("../../config/DB.js").sequelize;

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  phone: {
    type: DataTypes.STRING,
    unique: true,
  },
  national_id: DataTypes.STRING,
  role: {
    type: DataTypes.ENUM("citizen", "leader", "admin"),
    defaultValue: "citizen",
  },
  village: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = User;
