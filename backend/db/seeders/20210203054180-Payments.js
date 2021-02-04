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

const generateFakePayments = (numPayments = 749) =>{
  const fakePayments = [];
  while (numPayments > 0){
    fakePayments.push({
      paymentStatus: paymentStatuses[Math.floor(Math.random())],
      paymentType: paymentTypes[Math.floor(math.random() * 4)],
      roundId: numPayment
    })
    numPayments -= 1
  }
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
