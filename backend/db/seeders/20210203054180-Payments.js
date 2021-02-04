'use strict';

const paymentStatuses = [
  "received",
  "transferred"
]

const paymentTypes = [
  "visa",
  "amex",
  "paypal",
  "bit coin",
  "diner's club"
]

const generateFakePayments = (numPayments = 800) =>{
  const fakePayments = [];
  while (numPayments > 0){
    fakePayments.push({
      paymentStatus: paymentStatuses[Math.floor(Math.random())],
      paymentType: paymentTypes[Math.floor(Math.random() * 4)],
      roundId: numPayments
    })
    numPayments -= 1
  }
  return fakePayments;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Payments', [
        ...generateFakePayments(749)
      ], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Payments', null, {});
  }
};
