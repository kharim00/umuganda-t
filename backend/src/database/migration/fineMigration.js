"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Fines", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      event_id: {
        type: Sequelize.UUID,
        references: {
          model: "Events",
          key: "id",
        },
      },
      amount: Sequelize.INTEGER,
      reason: Sequelize.STRING,
      status: {
        type: Sequelize.ENUM("paid", "unpaid"),
        defaultValue: "unpaid",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Fines");
  },
};