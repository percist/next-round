'use strict';
module.exports = (sequelize, DataTypes) => {
  const Buddy = sequelize.define('Buddy', {
    ownerId: {
      type: DataTypes.INTEGER,
      references: { model: "Users" },
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
      allowNull: false,
    },
    buddyId: {
      type: DataTypes.INTEGER,
      references: { model: "Users" },
      refereceKey: "id",
      onUpdate: "cascade",
      onDelete: "cascade",
      allowNull: false,
    }
  }, {});
  Buddy.associate = function (models) {

  };
  return Buddy;
};