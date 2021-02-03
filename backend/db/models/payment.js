'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    paymentType: {
      allowNull: false,
      type: DataTypes.STRING(25)},
    paymentStatus: {
      allowNull: false,
      type: DataTypes.STRING(25)},
    roundId: {
      allowNull: false,
      type: DataTypes.INTEGER}
  }, {});
  Payment.associate = function(models) {
    Payment.belongsTo(models.Round, {foreignKey: "paymentId"})
  };
  return Payment;
};