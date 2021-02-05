'use strict';

const statuses= [
  "pending",
  "userPaid",
  "recipientClaimed",
  "sitePaidOut"
]

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Rounds', [
        { status: 'userPaid', receiverId: 1, senderId: 5},
        { status: 'userPaid', receiverId: 1, senderId: 4},
        { status: 'userPaid', receiverId: 1, senderId: 3},
        { status: 'userPaid', receiverId: 1, senderId: 2},
        { status: 'userPaid', receiverId: 2, senderId: 1},
        { status: 'userPaid', receiverId: 3, senderId: 1},
        { status: 'recipientClaimed', comment: "1Best Beer I've had in the area", receiverId: 2, senderId: 1},
        { status: 'recipientClaimed', comment: "2Best Beer I've had in the area", receiverId: 3, senderId: 1},
        { status: 'recipientClaimed', comment: "3Best Beer I've had in the area", receiverId: 4, senderId: 1},
        { status: 'recipientClaimed', comment: "4Best Beer I've had in the area", receiverId: 5, senderId: 1},
        { status: 'recipientClaimed', comment: "5Best Beer I've had in the area", receiverId: 2, senderId: 3},
        { status: 'recipientClaimed', comment: "6Best Beer I've had in the area", receiverId: 2, senderId: 4},
        { status: 'recipientClaimed', comment: "7Best Beer I've had in the area", receiverId: 2, senderId: 5},
        { status: 'sitePaidOut', comment: "8Best Beer I've had in the area", receiverId: 2, senderId: 1},
        { status: 'sitePaidOut', comment: "9Best Beer I've had in the area", receiverId: 3, senderId: 1},
        { status: 'sitePaidOut', comment: "10Best Beer I've had in the area", receiverId: 4, senderId: 1},
        { status: 'sitePaidOut', comment: "11Best Beer I've had in the area", receiverId: 5, senderId: 2},
        { status: 'sitePaidOut', comment: "12Best Beer I've had in the area", receiverId: 3, senderId: 2},
        { status: 'sitePaidOut', comment: "13Best Beer I've had in the area", receiverId: 4, senderId: 2},
        { status: 'sitePaidOut', comment: "14Best Beer I've had in the area", receiverId: 5, senderId: 3},
        { status: 'sitePaidOut', comment: "15Best Beer I've had in the area", receiverId: 6, senderId: 3},
        { status: 'sitePaidOut', comment: "16Best Beer I've had in the area", receiverId: 7, senderId: 3},
        { status: 'sitePaidOut', comment: "17Best Beer I've had in the area", receiverId: 8, senderId: 4}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rounds', null, {});
  }
};
