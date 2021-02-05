'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Menus', [
        { itemId: 1, siteId: 1 },
        { itemId: 2, siteId: 1 },
        { itemId: 3, siteId: 1 },
        { itemId: 4, siteId: 1 },
        { itemId: 5, siteId: 2 },
        { itemId: 6, siteId: 2 },
        { itemId: 7, siteId: 3 },
        { itemId: 8, siteId: 3 },
        { itemId: 10, siteId: 3 },
        { itemId: 11, siteId: 4 },
        { itemId: 12, siteId: 4 },
        { itemId: 13, siteId: 2 },
        { itemId: 14, siteId: 2 },
        { itemId: 15, siteId: 3 },
        { itemId: 16, siteId: 3 },
        { itemId: 17, siteId: 4 },
        { itemId: 18, siteId: 4 },
        { itemId: 19, siteId: 4 },
        { itemId: 20, siteId: 4 },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Menus', null, {});
  }
};
