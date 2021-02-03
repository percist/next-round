'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RoundReceiveds', [{
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundReceiveds', null, {});
  }
};
