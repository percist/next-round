'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RoundComments', [
        {updatedAt: faker.date.recent(), userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {updatedAt: faker.date.recent(), userId: 2, roundId: 1, body: "Super Cool."},
        {updatedAt: faker.date.recent(), userId: 3, roundId: 1, body: "Great story"},
        {updatedAt: faker.date.recent(), userId: 4, roundId: 1, body: "Wish I was there."},
        {updatedAt: faker.date.recent(), userId: 5, roundId: 1, body: "Have you had that one before?"},
        {updatedAt: faker.date.recent(), userId: 6, roundId: 1, body: "Sorry we missed it"},
        {updatedAt: faker.date.recent(), userId: 7, roundId: 2, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 8, roundId: 2, body: "Wow, looks like a great time!"},
        {updatedAt: faker.date.recent(), userId: 9, roundId: 2, body: "Super Cool."},
        {updatedAt: faker.date.recent(), userId: 10, roundId: 2, body: "Great story"},
        {updatedAt: faker.date.recent(), userId: 11, roundId: 3, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 12, roundId: 4, body: "Sorry we missed it"},
        {updatedAt: faker.date.recent(), userId: 13, roundId: 4, body: "Wish I was there."},
        {updatedAt: faker.date.recent(), userId: 14, roundId: 4, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 2, roundId: 5, body: "Great story"},
        {updatedAt: faker.date.recent(), userId: 3, roundId: 5, body: "Super Cool."},
        {updatedAt: faker.date.recent(), userId: 4, roundId: 6, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 5, roundId: 1, body: "Wow, looks like a great time!"},
        {updatedAt: faker.date.recent(), userId: 6, roundId: 8, body: "Have you had that one before?"},
        {updatedAt: faker.date.recent(), userId: 11, roundId: 1, body: "Wish I was there."},
        {updatedAt: faker.date.recent(), userId: 12, roundId: 11, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 13, roundId: 11, body: "Great story"},
        {updatedAt: faker.date.recent(), userId: 14, roundId: 11, body: "Wow, looks like a great time!"},
        {updatedAt: faker.date.recent(), userId: 15, roundId: 12, body: "Super Cool."},
        {updatedAt: faker.date.recent(), userId: 16, roundId: 15, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 17, roundId: 15, body: "Have you had that one before?"},
        {updatedAt: faker.date.recent(), userId: 18, roundId: 15, body: "Wish I was there."},
        {updatedAt: faker.date.recent(), userId: 2, roundId: 15, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 3, roundId: 15, body: "Super Cool."},
        {updatedAt: faker.date.recent(), userId: 4, roundId: 15, body: "Great story"},
        {updatedAt: faker.date.recent(), userId: 5, roundId: 15, body: "Wow, looks like a great time!"},
        {updatedAt: faker.date.recent(), userId: 6, roundId: 16, body: "Wish I was there."},
        {updatedAt: faker.date.recent(), userId: 1, roundId: 17, body: "Have you had that one before?"},
        {updatedAt: faker.date.recent(), userId: 1, roundId: 17, body: "Sorry we missed it"},
        {updatedAt: faker.date.recent(), userId: 1, roundId: 18, body: "Cheers to that!"},
        {updatedAt: faker.date.recent(), userId: 11, roundId: 20, body: "Super Cool."},
        {updatedAt: faker.date.recent(), userId: 12, roundId: 20, body: "Great story"},
        {updatedAt: faker.date.recent(), userId: 13, roundId: 20, body: "Wish I was there."}
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundComments', null, {});
  }
};
