"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      event_id: {
        type: Sequelize.UUID,
        references: {
          model: "Events",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      assigned_to: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
      },
      description: Sequelize.STRING,
      zone: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Tasks");
  },
};