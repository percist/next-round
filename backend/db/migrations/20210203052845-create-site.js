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
        unique: true
      },
      address: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      facbook: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      twitter: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      instagram: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      imgUrl: {
        type: Sequelize.String(1000)
      },
      menuId: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
      },
      reviewId: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Sites');
  }
};