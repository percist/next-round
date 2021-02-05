'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundItem = sequelize.define('RoundItem', {
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roundId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    }
  }, {});
  RoundItem.associate = function(models) {
    // associations can be defined here
  };
  return RoundItem;
};