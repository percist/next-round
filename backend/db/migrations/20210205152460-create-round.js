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
      comment: {
        allowNull: true,
        type: Sequelize.STRING(2000),
      },
      imgUrl: {
        allowNull: true,
        type: Sequelize.STRING(1000)
      },
      receiverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
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
    return queryInterface.dropTable('Rounds');
  }
};