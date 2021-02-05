'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Items', [
        { name: 'Beer 1', price: 733,description: "So good!" },
        { name: 'Beer 2', price: 733,description: "Pretty good" },
        { name: 'Beer 3', price: 733,description: "Light" },
        { name: 'Beer 4', price: 733,description: "Crisp" },
        { name: 'Beer 5', price: 733,description: "Hoppy" },
        { name: 'Beer 6', price: 733,description: "Quality" },
        { name: 'Beer 7', price: 733,description: "Very Good" },
        { name: 'Beer 8', price: 733,description: "Delicious" },
        { name: 'Beer 9', price: 733,description: "So Good" },
        { name: 'Beer 10', price: 695, description: "Really good" },
        { name: 'Beer 11', price: 695, description: "Crisp" },
        { name: 'Beer 12', price: 695, description: "So Hoppy" },
        { name: 'Beer 13', price: 695, description: "This one is good" },
        { name: 'Beer 14', price: 695, description: "Light" },
        { name: 'Beer 15', price: 695, description: "LowCal" },
        { name: 'Beer 16', price: 695, description: "Dark" },
        { name: 'Beer 17', price: 695, description: "Rich " },
        { name: 'Beer 18', price: 695, description: "Sour" },
        { name: 'Beer 19', price: 695, description: "Red" },
        { name: 'Beer 20', price: 695, description: "Pretty good" },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Items', null, {});
  }
};
