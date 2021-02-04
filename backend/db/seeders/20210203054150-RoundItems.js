'use strict';

// itemId {2700}, roundId {1000?}

const generateRandomRoundItems = (numItems, numRounds) =>{
  const randomRoundItems = [];
  while (numRounds > 0){
    const itemId = Math.floor(Math.random() * numItems) +1
    randomRoundItems.push({itemId: itemId, roundId: numRounds})
    numRounds -= 1
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RoundItems', [
      ...generateRandomRoundItems(2700, 900)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RoundItems', null, {});
  }
};
