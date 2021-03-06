'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Buddies', [
      { ownerId: 1, buddyId: 2 },
      { ownerId: 1, buddyId: 3 },
      { ownerId: 1, buddyId: 4 },
      { ownerId: 1, buddyId: 5 },
      { ownerId: 1, buddyId: 6 },
      { ownerId: 1, buddyId: 8 },
      { ownerId: 1, buddyId: 9 },
      { ownerId: 1, buddyId: 10 },
      { ownerId: 1, buddyId: 12 },
      { ownerId: 1, buddyId: 13 },
      { ownerId: 1, buddyId: 14 },
      { ownerId: 1, buddyId: 15 },
      { ownerId: 1, buddyId: 17 },
      { ownerId: 1, buddyId: 18 },
      { ownerId: 1, buddyId: 19 },
      { ownerId: 1, buddyId: 20 },
      { ownerId: 1, buddyId: 21 },
      { ownerId: 1, buddyId: 22 },
      { ownerId: 1, buddyId: 23 },
      { ownerId: 1, buddyId: 24 },
      { ownerId: 1, buddyId: 25 },
      { ownerId: 1, buddyId: 26 },
      { ownerId: 1, buddyId: 27 },
      { ownerId: 1, buddyId: 28 },
      { ownerId: 2, buddyId: 1 },
      { ownerId: 2, buddyId: 3 },
      { ownerId: 2, buddyId: 4 },
      { ownerId: 2, buddyId: 5 },
      { ownerId: 2, buddyId: 6 },
      { ownerId: 2, buddyId: 7 },
      { ownerId: 2, buddyId: 8 },
      { ownerId: 2, buddyId: 9 },
      { ownerId: 2, buddyId: 10 },
      { ownerId: 2, buddyId: 11 },
      { ownerId: 2, buddyId: 12 },
      { ownerId: 3, buddyId: 1 },
      { ownerId: 3, buddyId: 2 },
      { ownerId: 3, buddyId: 4 },
      { ownerId: 3, buddyId: 5 },
      { ownerId: 3, buddyId: 6 },
      { ownerId: 3, buddyId: 7 },
      { ownerId: 3, buddyId: 8 },
      { ownerId: 3, buddyId: 9 },
      { ownerId: 3, buddyId: 10 },
      { ownerId: 3, buddyId: 11 },
      { ownerId: 3, buddyId: 12 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Buddies', null, {});
  }
};
