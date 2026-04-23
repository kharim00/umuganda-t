"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Attendances", {
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
      status: {
        type: Sequelize.ENUM("present", "absent"),
        defaultValue: "absent",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Attendances");
  },
};