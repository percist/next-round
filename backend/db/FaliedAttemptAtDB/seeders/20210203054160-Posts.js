'use strict';
const faker = require('faker');

const generateRandomPost = (numPosts = 500) => {
  const randomPosts = [];
  while (numPosts > 0){
    randomPosts.push({
      content: faker.lorem.sentences(5),
      roundId: numPosts,
    })
    numPosts -= 1;
  }
  return randomPosts;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Posts', [
        ...generateRandomPost()
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Posts', null, {});
  }
};
