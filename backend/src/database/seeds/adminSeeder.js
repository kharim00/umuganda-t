"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("admin123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        id: Sequelize.UUIDV4(),
        name: "Admin",
        phone: "0780000000",
        role: "admin",
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};