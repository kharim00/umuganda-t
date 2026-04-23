const { DataTypes } = require("sequelize");
const sequelize = require("../../config/DB.js").sequelize;

const Attendance = sequelize.define("Attendance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: DataTypes.UUID,
  event_id: DataTypes.UUID,
  status: {
    type: DataTypes.ENUM("present", "absent"),
    defaultValue: "absent",
  },
});

module.exports = Attendance;
