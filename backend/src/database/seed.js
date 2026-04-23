"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await queryInterface.bulkInsert("users", [ // 🔥 FIXED TABLE NAME
      {
        id: Sequelize.literal("UUID()"), // 🔥 FIXED UUID
        name: "System Admin",
        phone: "0780000000",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      phone: "0780000000",
    });
  },
};