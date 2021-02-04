'use strict';

const status = [
'pending',
'paid',
'used',
'closed'
]

const fakeRounds = (numUsers, statusArray, numSites) => {
  const fakeRoundsArray= [];
  while (status.length >= 0){
    let statusUsed = status[status.length]
    while ( numUsers > 0){
      let senderId = numUsers;
      let randomNumOfRecievers = Math.ceil(Math.random() * 20);
      while ( randomNumOfRecievers > 0){
        let reciever = Math.ceil(Math.random() * 1000);
        let site = Math.ceil(math.random() * numSites)
        fakeRoundsArray.push({status: statusUsed, senderId: ownerId, recieverId: receiver})
        randomNumOfRecievers -= 1
      }
      numUsers -= 1
    }
    status.pop()
  }
  return fakeRoundsArray;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rounds', [...fakeRounds(1000, status, 300)], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rounds', null, {});
  }
};
