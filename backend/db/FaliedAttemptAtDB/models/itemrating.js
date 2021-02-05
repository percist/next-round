'use strict';
module.exports = (sequelize, DataTypes) => {
  const ItemRating = sequelize.define('ItemRating', {
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    rating: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(2000)
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  ItemRating.associate = function(models) {

  };
  return ItemRating;
};