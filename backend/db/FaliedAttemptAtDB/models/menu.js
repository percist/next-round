'use strict';
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    siteId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};