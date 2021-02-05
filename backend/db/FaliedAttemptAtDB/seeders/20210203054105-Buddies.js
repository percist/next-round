'use strict';

const fakeBuddies = (numUsers) => {
  const fakeBuddiesArray= [];
  while ( numUsers > 0){
    let ownerId = numUsers;
    let randomNumOfBuddies = Math.ceil(Math.random() * 50);
    while ( randomNumOfBuddies > 0){
      let randomBuddies = Math.ceil(Math.random() * 1000);
      fakeBuddiesArray.push({ownerId: ownerId, buddyId: randomNumOfBuddies})
      randomNumOfBuddies -= 1
    }
    numUsers -= 1
  }
  return fakeBuddiesArray;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Buddies', [...fakeBuddies(1000)], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Buddies', null, {});
  }
};
