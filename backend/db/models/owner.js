'use strict';
module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define('Owner', {
    userId: {
      allowNull: false, 
      type: DataTypes.INTEGER
    },
    siteId: {
      allowNull: false, 
      type: DataTypes.INTEGER
    }
  }, {});
  Owner.associate = function(models) {
    // associations can be defined here
  };
  return Owner;
};