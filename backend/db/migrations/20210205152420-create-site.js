'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(256),
        allowNull: false,
        validate: {
          len: [4, 256],
        },
      },
      address: {
        type: Sequelize.STRING(256),
        allowNuyll: false,
        validate: {
          len: [4, 256],
        },
      },
      city: {
        type: Sequelize.STRING(100),
        allowNuyll: false,
        validate: {
          len: [4, 100],
        },
      },
      state: {
        type: Sequelize.STRING(2),
        allowNuyll: false,
        validate: {
          len: [2],
        },
      },
      zip: {
        type: Sequelize.STRING(10),
        allowNuyll: false,
        validate: {
          len: [2, 5],
        },
      },
      website: {
        type: Sequelize.STRING(1000),
        validate: {
          isURL: true
        }
      },
      imgUrl: {
        type: Sequelize.STRING(1000)
      },
      active: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('Sites');
  }
};