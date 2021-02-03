'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundReceived = sequelize.define('RoundReceived', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  RoundReceived.associate = function(models) {
    // associations can be defined here
  };
  return RoundReceived;
};