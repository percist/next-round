'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RoundComments', [
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 2, roundId: 1, body: "Super Cool."},
        {userId: 3, roundId: 1, body: "Great story"},
        {userId: 4, roundId: 1, body: "Wish I was there."},
        {userId: 5, roundId: 1, body: "Have you had that one before?"},
        {userId: 6, roundId: 1, body: "Sorry we missed it"},
        {userId: 7, roundId: 2, body: "Cheers to that!"},
        {userId: 8, roundId: 2, body: "Wow, looks like a great time!"},
        {userId: 9, roundId: 2, body: "Super Cool."},
        {userId: 10, roundId: 2, body: "Great story"},
        {userId: 11, roundId: 3, body: "Cheers to that!"},
        {userId: 12, roundId: 4, body: "Sorry we missed it"},
        {userId: 13, roundId: 4, body: "Wish I was there."},
        {userId: 14, roundId: 4, body: "Cheers to that!"},
        {userId: 2, roundId: 5, body: "Great story"},
        {userId: 3, roundId: 5, body: "Super Cool."},
        {userId: 4, roundId: 6, body: "Cheers to that!"},
        {userId: 5, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 6, roundId: 8, body: "Have you had that one before?"},
        {userId: 11, roundId: 1, body: "Wish I was there."},
        {userId: 12, roundId: 11, body: "Cheers to that!"},
        {userId: 13, roundId: 11, body: "Great story"},
        {userId: 14, roundId: 11, body: "Wow, looks like a great time!"},
        {userId: 15, roundId: 12, body: "Super Cool."},
        {userId: 16, roundId: 15, body: "Cheers to that!"},
        {userId: 17, roundId: 15, body: "Have you had that one before?"},
        {userId: 18, roundId: 15, body: "Wish I was there."},
        {userId: 2, roundId: 15, body: "Cheers to that!"},
        {userId: 3, roundId: 15, body: "Super Cool."},
        {userId: 4, roundId: 15, body: "Great story"},
        {userId: 5, roundId: 15, body: "Wow, looks like a great time!"},
        {userId: 6, roundId: 16, body: "Wish I was there."},
        {userId: 1, roundId: 17, body: "Have you had that one before?"},
        {userId: 1, roundId: 17, body: "Sorry we missed it"},
        {userId: 1, roundId: 18, body: "Cheers to that!"},
        {userId: 11, roundId: 20, body: "Super Cool."},
        {userId: 12, roundId: 20, body: "Great story"},
        {userId: 13, roundId: 20, body: "Wish I was there."}
      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundComments', null, {});
  }
};
