'use strict';
module.exports = (sequelize, DataTypes) => {
  const Round = sequelize.define('Round', {
    status: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
    receiverId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Users"}
    },
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Users"}
    }, 
    comment: {
      allowNull: true,
      type: DataTypes.STRING(2000),
    },
    imgUrl: {
      allowNull: true,
      type: DataTypes.STRING(1000)
    },
  });
  Round.associate = function(models) {
    const columnMapping1 = {
      foreignKey: 'roundId',
      through: 'RoundItems',
      otherKey: 'itemId'
    }; 
    Round.belongsToMany(models.Item, columnMapping1);
    Round.belongsTo(models.User, {foreignKey: 'senderId'})
    Round.belongsTo(models.User, {foreignKey: 'receiverId'})
    Round.hasOne(models.Payment, {foreignKey: "roundId"})
    Round.hasOne(models.RoundItem, {foreignKey: 'roundId'})
  };
  return Round;
};