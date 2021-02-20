'use strict';
module.exports = (sequelize, DataTypes) => {
  const RoundComment = sequelize.define('RoundComment', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    body: {
      allowNuyll: true,
      type: DataTypes.STRING(2000)
    }
  }, {});
  RoundComment.associate = function(models) {
    RoundComment.belongsTo(models.User, { foreignKey: "userId" });
    RoundComment.belongsTo(models.Round, { foreignKey: "roundId" });
  };
  return RoundComment;
};