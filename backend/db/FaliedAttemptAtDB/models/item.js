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
    ratingId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roundItemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    menuId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Item.associate = function(models) {
    const columnMapping1 = {
      foreignKey: 'itemId',
      through: 'Menus',
      otherKey: 'siteId'
    };
    const columnMapping2 = {
      foreignKey: 'itemId',
      through: 'Favories',
      otherKey: 'userId'
    };
    const columnMapping3 = {
      foreignKey: 'itemId',
      through: 'RoundItems',
      otherKey: 'roundId'
    };
    const columnMapping4 = {
      foreignKey: 'itemId',
      through: 'ItemRatings',
      otherKey: 'roundId'
    };
    Item.belongsToMany(models.Site, columnMapping1)  
    Item.belongsToMany(models.User, columnMapping2)  
    Item.belongsToMany(models.Round, columnMapping3)  
    Item.belongsToMany(models.Round, columnMapping4)  
  };
  return Item;
};