'use strict';

const statuses= [
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
        { status: 'recipientClaimed', comment: "1Best Beer I've had in the area", receiverId: 2, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1532635260-3db6e1ba8589?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
        { status: 'recipientClaimed', comment: "2Best Beer I've had in the area", receiverId: 3, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1593806812862-1dc510b769a8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
        { status: 'recipientClaimed', comment: "3Best Beer I've had in the area", receiverId: 4, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1563551342810-8da014a2160f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDF8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
        { status: 'recipientClaimed', comment: "4Best Beer I've had in the area", receiverId: 5, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1591724080578-64c52de368c4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
        { status: 'recipientClaimed', comment: "5Best Beer I've had in the area", receiverId: 2, senderId: 3, imgUrl: `https://images.unsplash.com/photo-1563525329399-0c61ba41684d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
        { status: 'recipientClaimed', comment: "6Best Beer I've had in the area", receiverId: 2, senderId: 4, imgUrl: `https://images.unsplash.com/photo-1555970348-3a10b197f131?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzF8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
        { status: 'recipientClaimed', comment: "7Best Beer I've had in the area", receiverId: 2, senderId: 5, imgUrl: `https://images.unsplash.com/photo-1555970348-3a10b197f131?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzF8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`},
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
