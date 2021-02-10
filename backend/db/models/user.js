'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
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
      through: 'Owners',
      otherKey: 'siteId'
    };
    const columnMapping2 = {
      foreignKey: 'ownerId',
      through: 'Buddies',
      as: "follower",
      otherKey: 'buddyId',
    };
    const columnMapping3 = {
      foreignKey: 'buddyId',
      through: 'Buddies',
      as: "following",
      otherKey: 'ownerId',
    };
    const columnMapping4 = {
      as: 'HasSentRoundsTo', 
      through: "Rounds", 
      foreignKey: 'senderId', 
      otherKey: 'receiverId'
    }
    const columnMapping5 = {
      as: 'HasReceivedRoundsFrom', 
      through: "Rounds", 
      foreignKey: 'receiverId', 
      otherKey: 'senderId'
    }
    User.belongsToMany(models.Site, columnMapping1); // through Owners
    User.belongsToMany(models.User, columnMapping2); // through Buddies as follower
    User.belongsToMany(models.User, columnMapping3); // through Buddies as following
    User.belongsToMany(models.Round, columnMapping4); // through Rounds as hasSentRoundsTo
    User.belongsToMany(models.Round, columnMapping5); // through Rounds as hasReceivedRoundsFrom
    User.hasMany(models.Round, {foreignKey: 'senderId' });
    User.hasMany(models.Round, {foreignKey: 'receiverId' });
  };
  User.prototype.toSafeObject = function () { 
    const { id, username, email, imgUrl } = this; 
    return { id, username, email, imgUrl };
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