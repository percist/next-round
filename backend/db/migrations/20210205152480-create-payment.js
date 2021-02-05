'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tip: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fee: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      paymentType: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      roundId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Rounds"}
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
    return queryInterface.dropTable('Payments');
  }
};