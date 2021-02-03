'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Owners', [
        {
        userId: 1,
        siteId: 1
      },
        {
        userId: 2,
        siteId: 2
      },
        {
        userId: 3,
        siteId: 3
      },
        {
        userId: 3,
        siteId: 4
      },
        {
        userId: 4,
        siteId: 5
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Owners', null, {});
  
  }
};
