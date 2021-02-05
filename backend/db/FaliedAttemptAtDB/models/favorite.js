'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: "Users",
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};