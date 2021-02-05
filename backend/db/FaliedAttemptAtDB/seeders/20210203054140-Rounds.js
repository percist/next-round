'use strict';

const status = [
'pending',
'paid',
'used',
'closed'
]

const fakeRounds = (statusArray) => {
  const fakeRoundsArray= [];
  while (statusArray.length > 0){
    const statusUsed = statusArray[statusArray.length-1]
    let numUsers = 100
    while ( numUsers > 0){
      const receiver = Math.ceil(Math.random() * 500);
      // const site = Math.ceil(Math.random() * numSites)
      const newRound = {
        status: statusUsed, 
        senderId: numUsers, 
        receiverId: receiver,
        roundItemId: numUsers,
        paymentId: numUsers
      }
      fakeRoundsArray.push(newRound)
      numUsers -= 1
    }
    statusArray.pop()
  }
  return fakeRoundsArray;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rounds', 
    [
      // ...fakeRounds(status), 
    {status: "pending", senderId: 2, receiverId: 3, roundItemId: 1, paymentId: 1},
    {status: "pending", senderId: 3, receiverId: 2, roundItemId: 2, paymentId: 2},
    {status: "pending", senderId: 4, receiverId: 3, roundItemId: 3, paymentId: 3},
    {status: "pending", senderId: 5, receiverId: 4, roundItemId: 4, paymentId: 4},
    {status: "pending", senderId: 6, receiverId: 5, roundItemId: 5, paymentId: 5},
    {status: "pending", senderId: 7, receiverId: 6, roundItemId: 6, paymentId: 6}
    ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rounds', null, {});
  }
};
