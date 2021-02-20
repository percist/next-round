'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RoundComments', [
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"},
        {userId: 1, roundId: 1, body: "Wow, looks like a great time!"}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundComments', null, {});
  }
};
