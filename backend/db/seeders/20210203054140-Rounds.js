'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rounds', [
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },
      {
        status: 'pending',
        recieverId: 1,
        senderId: 2,
        siteId: 1,
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rounds', null, {});
  }
};
