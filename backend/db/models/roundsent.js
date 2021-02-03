'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundSent = sequelize.define('RoundSent', {
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
  RoundSent.associate = function(models) {
    // associations can be defined here
  };
  return RoundSent;
};