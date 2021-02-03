'use strict';
module.exports = (sequelize, DataTypes) => {
  const Buddy = sequelize.define('Buddy', {
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buddyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Buddy.associate = function(models) {
    // associations can be defined here
  };
  return Buddy;
};