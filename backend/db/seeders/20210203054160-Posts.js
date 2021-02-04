'use strict';
const faker = require('faker');

const generateRandomPost = (numPosts = 500) => {
  const randomPosts = [];
  while (numPosts > 0){
    randomPosts.push({
      content: faker.lorem.paragraph(),
      roundId: numPosts,
    })
    numPosts -= 1;
  }

}
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Posts', [

      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Posts', null, {});
  }
};
