'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RoundItems', [
        { itemId: 1, roundId: 1 },
        { itemId: 1, roundId: 2 },
        { itemId: 1, roundId: 3 },
        { itemId: 1, roundId: 4 },
        { itemId: 1, roundId: 5 },
        { itemId: 1, roundId: 6 },
        { itemId: 1, roundId: 7 },
        { itemId: 2, roundId: 8 },
        { itemId: 3, roundId: 9 },
        { itemId: 4, roundId: 10 },
        { itemId: 5, roundId: 11 },
        { itemId: 6, roundId: 12 },
        { itemId: 4, roundId: 13 },
        { itemId: 5, roundId: 13 },
        { itemId: 3, roundId: 13 },
        { itemId: 7, roundId: 14 },
        { itemId: 4, roundId: 14 },
        { itemId: 6, roundId: 15 },
        { itemId: 3, roundId: 15 },
        { itemId: 8, roundId: 15 },
        { itemId: 12, roundId: 16 },
        { itemId: 13, roundId: 16 },
        { itemId: 15, roundId: 16 }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundItems', null, {});
  }
};
