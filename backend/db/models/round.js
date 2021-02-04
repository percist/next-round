'use strict';
module.exports = (sequelize, DataTypes) => {
  const Round = sequelize.define('Round', {
    status: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
    recieverId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: "Users",
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    senderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: "Users",
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    roundItemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    siteId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    paymentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Round.associate = function(models) {
    const columnMapping1 = {
      foreignKey: 'roundId',
      through: 'RoundItems',
      otherKey: 'itemId'
    };
    const columnMapping2 = {
      foreignKey: 'roundId',
      through: 'ItemRatings',
      otherKey: 'itemId'
    };
    Round.belongsToMany(models.Item, columnMapping1);
    Round.belongsToMany(models.Item, columnMapping2);
    Round.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId'})
    Round.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId'})
    Round.hasOne(models.Site, {foreignKey: "roundId"});
    Round.hasOne(models.Post, {foreignKey: "roundId"});
    Round.hasOne(models.Payment, {foreignKey: "roundId"})
  };
  return Round;
};