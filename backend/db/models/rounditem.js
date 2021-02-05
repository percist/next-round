'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundItem = sequelize.define('RoundItem', {
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Items"}
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Rounds"}
    }  
  }, {});
  RoundItem.associate = function(models) {
    // associations can be defined here
  };
  return RoundItem;
};