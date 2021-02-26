'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          // len: [4, 50],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
          len: [3, 30]
        }
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          len: [3, 50]
        }
      },
      zip: {
        type: Sequelize.STRING(10),
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        },
      },
      imgUrl: {
        type: Sequelize.STRING(1000)
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [60, 60]
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: "2020-11-13T10:05:20.000Z",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: "2020-11-13T10:05:20.000Z",
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
