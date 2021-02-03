'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
      {
        name: 'Beer',
        description: "Delicious IPA"
      },
      {
        name: 'Beer',
        description: "Delicious Pilsner"
      },
      {
        name: 'Wine',
        description: "Delicious Red"
      },
      {
        name: 'Wine',
        description: "Delicious White"
      },
      {
        name: 'Whiskey',
        description: "Delicious 15yr"
      },
      {
        name: 'Rum',
        description: "Delicious Jamacian"
      },
      {
        name: 'Beer',
        description: "Delicious Stout"
      },
      {
        name: 'Beer',
        description: "OK Stout"
      },
      {
        name: 'Beer',
        description: "OK IPA"
      },
      {
        name: 'Champagne',
        description: "Delicious Champs"
      },
    ], {});
  },
  
  down: (queryInterface, Sequelize) => {
return queryInterface.bulkDelete('Items', null, {});
  
  }
};
