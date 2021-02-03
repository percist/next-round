'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rounds', [
      {
        status: 'pending',
        userId: 1,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 1,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 1,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 1,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 1,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        userId: 1,
        siteId: 1,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rounds', null, {});
  }
};
