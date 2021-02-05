'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Items"}
    },
    siteId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {model: "Sites"}
    }  
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};