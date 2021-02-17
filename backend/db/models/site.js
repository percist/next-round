'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        len: [4, 256],
      },
    },
    address: {
      type: DataTypes.STRING(256),
      allowNuyll: false,
      validate: {
        len: [4, 256],
      },
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
      type: DataTypes.STRING(10),
      allowNuyll: false,
      validate: {
        len: [2, 5],
      },
    },
    website: {
      type: DataTypes.STRING(1000),
      validate: {
        isURL: true
      }
    },
    imgUrl: {
      type: DataTypes.STRING(1000)
    },
    active: DataTypes.BOOLEAN

  }, {});
  Site.associate = function (models) {
    const columnMapping1 = {
      foreignKey: 'siteId',
      through: 'Owners',
      otherKey: 'userId'
    };
    const columnMapping2 = {
      foreignKey: 'siteId',
      through: 'Menus',
      otherKey: 'itemId'
    };
    Site.belongsToMany(models.User, columnMapping1);
    Site.belongsToMany(models.Item, columnMapping2);
  };
  return Site;
};