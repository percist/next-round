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
    RoundItem.hasOne(models.Round, {foreignKey: "id"})
    RoundItem.hasOne(models.Item, {foreignKey: "id"})
  };
  return RoundItem;
};