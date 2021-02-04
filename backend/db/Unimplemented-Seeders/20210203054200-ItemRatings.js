'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ItemRatings', [{
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ItemRatings', null, {});
  }
};
