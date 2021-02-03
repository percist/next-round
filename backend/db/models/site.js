'use strict';
const { Validator} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        len: [4, 256],
      },
      unique: true,
    },
    address: {
      type: DataTypes.STRING(256),
      allowNuyll: false,
      validate: {
        len: [4, 256],
      },
      unique: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNuyll: false,
      validate: {
        len: [4, 100],
      },
    },
    state: {
      type: DataTypes.STRING(2),
      allowNuyll: false,
      validate: {
        len: [2],
      },
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNuyll: false,
      validate: {
        len: [2, 5],
      },
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isURL: [{
            msg: 'website must be a URL beginning with "https://".',
            protocols: ['https'],
            require_protocol: true
        }]
      },
    },
    facbook: {
      type: DataTypes.STRING(2),
      validate: {
        len: [2],
      },
    },
    twitter: {
      type: DataTypes.STRING(2),
      validate: {
        len: [2],
      },
    },
    instagram: {
      type: DataTypes.STRING(2),
      validate: {
        len: [2],
      },
    },
    imgUrl: {
      type: DataTypes.STRING(1000)
    },
    menuId: DataTypes.INTEGER,
    ownersId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {});
  Site.associate = function(models) {
    const columnMapping1 = {
      foreignKey: 'siteId',
      through: 'Owners',
      otherKey: 'userId'
    };
    const columnMapping2 = {
      foreignKey: 'siteId',
      through: 'Saves',
      otherKey: 'userId'
    };
    const columnMapping3 = {
      foreignKey: 'siteId',
      through: 'Menus',
      otherKey: 'itemId'
    };
    Site.belongsToMany(models.User, columnMapping1);
    Site.belongsToMany(models.User, columnMapping1);
    Site.belongsToMany(models.Item, columnMapping1);
    Site.hasMany(models.Round, {foreignKey: "siteId"})

  };
  return Site;
};