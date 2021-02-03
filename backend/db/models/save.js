'use strict';
module.exports = (sequelize, DataTypes) => {
  const Save = sequelize.define('Save', {
    siteId: {
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
  Save.associate = function(models) {
    // associations can be defined here
  };
  return Save;
};