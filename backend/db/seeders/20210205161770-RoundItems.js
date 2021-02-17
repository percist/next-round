'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RoundItems', [
      { itemId: 1, roundId: 1 },
      { itemId: 6, roundId: 2 },
      { itemId: 13, roundId: 3 },
      { itemId: 17, roundId: 4 },
      { itemId: 2, roundId: 5 },
      { itemId: 7, roundId: 6 },
      { itemId: 14, roundId: 7 },
      { itemId: 18, roundId: 8 },
      { itemId: 3, roundId: 9 },
      { itemId: 8, roundId: 10 },
      { itemId: 15, roundId: 11 },
      { itemId: 19, roundId: 12 },
      { itemId: 4, roundId: 14 },
      { itemId: 9, roundId: 15 },
      { itemId: 16, roundId: 16 },
      { itemId: 20, roundId: 17 },
      { itemId: 5, roundId: 18 },
      { itemId: 10, roundId: 19 },
      { itemId: 11, roundId: 20 },
      { itemId: 1, roundId: 21 },
      { itemId: 12, roundId: 22 },
      { itemId: 13, roundId: 23 }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RoundItems', null, {});
  }
};
