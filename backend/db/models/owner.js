'use strict';
module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define('Owner', {
    userId: {
      allowNull: false, 
      type: DataTypes.INTEGER,
      references: {model: "Users"},
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    siteId: {
      allowNull: false, 
      type: DataTypes.INTEGER,
      references: {model: "Sites"},
      onUpdate: "cascade",
      onDelete: "cascade",
    }  
  }, {});
  Owner.associate = function(models) {
  };
  return Owner;
};