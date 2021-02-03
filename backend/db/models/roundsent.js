'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundSent = sequelize.define('RoundSent', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  RoundSent.associate = function(models) {
    // associations can be defined here
  };
  return RoundSent;
};