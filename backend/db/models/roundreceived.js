'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundReceived = sequelize.define('RoundReceived', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: "Users",
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: "Users",
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    }
  }, {});
  RoundReceived.associate = function(models) {
    // associations can be defined here
  };
  return RoundReceived;
};