'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Payments', [
        {tip: 100, fee: 200, paymentType: "visa", roundId: 1 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 2 },
        {tip: 100, fee: 200, paymentType: "visa", roundId: 3 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 4 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 5 },
        {tip: 100, fee: 200, paymentType: "visa", roundId: 6 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 7 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 8 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 9 },
        {tip: 100, fee: 200, paymentType: "visa", roundId: 10 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 11 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 12 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 13 },
        {tip: 100, fee: 200, paymentType: "visa", roundId: 14 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 15},
        {tip: 100, fee: 200, paymentType: "visa", roundId: 16 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 17 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 18 },
        {tip: 100, fee: 200, paymentType: "visa", roundId: 19 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 20 },
        {tip: 100, fee: 200, paymentType: "payPal", roundId: 21 },
        {tip: 100, fee: 200, paymentType: "amex", roundId: 22 },
        {tip: 100, fee: 200, paymentType: "visa", roundId: 23 }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Payments', null, {});
  }
};
