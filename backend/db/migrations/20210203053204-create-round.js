'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rounds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      recipientId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      purchaserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roundItemId: {
        type: Sequelize.INTEGER
      },
      siteId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      paymentId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Rounds');
  }
};