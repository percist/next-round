'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(256)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    imgUrl: {
      allowNull: true,
      type: DataTypes.STRING(1000)
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {});
  Item.associate = function (models) {
    const columnMapping1 = {
      foreignKey: 'itemId',
      through: 'Menus',
      otherKey: 'siteId'
    };
    const columnMapping2 = {
      foreignKey: 'itemId',
      through: 'RoundItems',
      otherKey: 'roundId'
    };
    Item.belongsToMany(models.Site, columnMapping1)
    Item.belongsToMany(models.Round, columnMapping2)
  };
  return Item;
};