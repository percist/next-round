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
    const columnMapping3 = {
      foreignKey: 'roundId',
      as: 'received',
      through: 'RoundsReceived',
      otherKey: 'userId'
    };
    const columnMapping4 = {
      foreignKey: 'roundId',
      as: 'sent',
      through: 'RoundsSent',
      otherKey: 'userId'
    };
    Round.belongsToMany(models.Item, columnMapping1);
    Round.belongsToMany(models.Item, columnMapping2);
    Round.belongsToMany(models.User, columnMapping3);
    Round.belongsToMany(models.User, columnMapping4);
    Round.hasOne(models.Site, {foreignKey: "roundId"});
    Round.hasOne(models.Post, {foreignKey: "roundId"});
    Round.hasOne(models.Payment, {foreignKey: "roundId"})
  };
  return Round;
};