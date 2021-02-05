'use strict';

const { Validator } = require("sequelize");
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [3, 30]
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    zip: {
      type: DataTypes.STRING(10),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    imgUrl: {
      type: DataTypes.STRING(1000)
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] },
        },
        loginUser: {
          attributes: {},
        },
      },
    });
  User.associate = function (models) {
    const columnMapping1 = {
      foreignKey: 'userId',
      through: 'Saves',
      otherKey: 'siteId'
    };
    const columnMapping2 = {
      foreignKey: 'userId',
      through: 'Likes',
      otherKey: 'commentId'
    };
    const columnMapping3 = {
      foreignKey: 'userId',
      through: 'Favorites',
      otherKey: 'itemId'
    };
    const columnMapping4 = {
      foreignKey: 'userId',
      through: 'Owners',
      otherKey: 'siteId'
    };
    const columnMapping5 = {
      foreignKey: 'ownerId',
      through: 'Buddy',
      as: "followers",
      otherKey: 'buddyId',
    };
    const columnMapping6 = {
      foreignKey: 'buddyId',
      through: 'Buddy',
      as: "following",
      otherKey: 'ownerId',
    };
    const columnMapping7 = {
      as: 'HasSentRoundsTo', 
      through: models.Round, 
      foreignKey: 'senderId', 
      otherKey: 'receiverId'
    }
    const columnMapping8 = {
      as: 'HasReceivedRoundsFrom', 
      through: models.Round, 
      foreignKey: 'receiverId', 
      otherKey: 'senderId'
    }
    User.belongsToMany(models.Site, columnMapping1);
    User.belongsToMany(models.Comment, columnMapping2);
    User.belongsToMany(models.Item, columnMapping3);
    User.belongsToMany(models.Site, columnMapping4);
    User.belongsToMany(models.User, columnMapping5);
    User.belongsToMany(models.User, columnMapping6);
    User.belongsToMany(models.User, columnMapping7);
    User.belongsToMany(models.User, columnMapping8);
    User.hasMany(models.Round, {foreignKey: 'senderId' });
    User.hasMany(models.Round, {foreignKey: 'receiverId' });
  };
  User.prototype.toSafeObject = function () { 
    const { id, username, email } = this; 
    return { id, username, email };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ 
    username, 
    firstName,
    lastName,
    zip,
    imgUrl,
    email, 
    password 
  }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      firstName,
      lastName,
      zip,
      imgUrl,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};