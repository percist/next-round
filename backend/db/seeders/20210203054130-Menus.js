'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Menus', [
        {
          itemId: 1,
          siteId: 1
        },
        {
          itemId: 2,
          siteId: 1
        },
        {
          itemId: 3,
          siteId: 1
        },
        {
          itemId: 4,
          siteId: 2
        },
        {
          itemId: 5,
          siteId: 2
        },
        {
          itemId: 6,
          siteId: 2
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Menus', null, {});
  }
};
