'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Buddies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {model: "Users"},
        refereceKey: "id",
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      buddyId: {
        type: Sequelize.INTEGER,
        references: {model: "Users"},
        refereceKey: "id",
        onUpdate: "cascade",
        onDelete: "cascade",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Buddies');
  }
};