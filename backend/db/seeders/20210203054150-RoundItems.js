'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RoundItems', [
      {
        itemId: 1,
        roundId: 1
      },
      {
        itemId: 1,
        roundId: 2
      },
      {
        itemId: 1,
        roundId: 3
      },
      {
        itemId: 2,
        roundId: 4
      },
      {
        itemId: 3,
        roundId: 5
      },
      {
        itemId: 4,
        roundId: 6
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundItems', null, {});
  }
};
