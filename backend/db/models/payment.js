'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    tip: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    fee: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    paymentType: {
      allowNull: false,
      type: DataTypes.STRING(25)
    },
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Rounds" }
    }
  }, {});
  Payment.associate = function (models) {
    Payment.belongsTo(models.Round, { foreignKey: "roundId" })
  };
  return Payment;
};