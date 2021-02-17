'use strict';
const faker = require('faker');

const statuses = [
  "userPaid",
  "recipientClaimed",
  "sitePaidOut"
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rounds', [
      { createdAt: faker.date.recent(), status: 'userPaid', receiverId: 1, senderId: 5 },
      { createdAt: faker.date.recent(), status: 'userPaid', receiverId: 1, senderId: 4 },
      { createdAt: faker.date.recent(), status: 'userPaid', receiverId: 1, senderId: 3 },
      { createdAt: faker.date.recent(), status: 'userPaid', receiverId: 1, senderId: 2 },
      { createdAt: faker.date.recent(), status: 'userPaid', receiverId: 2, senderId: 1 },
      { createdAt: faker.date.recent(), status: 'userPaid', receiverId: 3, senderId: 1 },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Who needs an umbrella in your drink when you have a duck! Cheers!", receiverId: 2, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1532635260-3db6e1ba8589?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Today's rugby beer", receiverId: 3, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1593806812862-1dc510b769a8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Good stuff. I’m a new local.", receiverId: 4, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1563551342810-8da014a2160f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDF8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Drinking indoors (again) as Charleston floats away. ", receiverId: 5, senderId: 1, imgUrl: `https://images.unsplash.com/photo-1591724080578-64c52de368c4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Last Call!!! This beer is very 'Near and Dear' to my heart! ", receiverId: 2, senderId: 3, imgUrl: `https://images.unsplash.com/photo-1563525329399-0c61ba41684d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Something new .Not 1 of my favs", receiverId: 1, senderId: 4, imgUrl: `https://images.unsplash.com/photo-1555970348-3a10b197f131?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzF8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Pulled some of the good stuff from the fridge while still good.", receiverId: 1, senderId: 5, imgUrl: `https://images.unsplash.com/photo-1555970348-3a10b197f131?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzF8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Too cold for a porch but we did a fairly isolated birthday party all week for my lovely wife.", receiverId: 2, senderId: 1, imgUrl: "https://images.unsplash.com/photo-1532634751-61aa22584da8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "A go to favorite", receiverId: 3, senderId: 1, imgUrl: "https://images.unsplash.com/photo-1557944941-6e2dae30f0aa?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODJ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Sticky,  wet & delicious", receiverId: 4, senderId: 1, imgUrl: "https://images.unsplash.com/photo-1569498285255-9c027f5b0660?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVlciUyMHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "This is always a good one!", receiverId: 5, senderId: 2, imgUrl: "https://images.unsplash.com/photo-1551862368-7e6687b42c2a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8YmVlciUyMHBlcnNvbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "At least it's beer. Cheers, y'all! See you on the other side.", receiverId: 3, senderId: 2, imgUrl: "https://images.unsplash.com/photo-1584108927686-9b246e8351e6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlZXIlMjBwZXJzb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "A must have.  Great flavor.", receiverId: 4, senderId: 2, imgUrl: "https://images.unsplash.com/photo-1570037858131-aa1ab2aaf477?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fGJlZXIlMjBwZXJzb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Beer by candlelight like the cavemen and cavewomen used to do.", receiverId: 5, senderId: 3, imgUrl: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGJlZXIlMjBwZXJzb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "Because I’m an idiot and I forgot what today is. Because I went to Publix on Harbison Blvd. In the rain. On February 13th. Because I got stuck behind someone whose car kept stalling and couldn’t get around them for 20 minutes. Because I deserve it. Better one is coming later.", receiverId: 6, senderId: 3, imgUrl: "https://images.unsplash.com/photo-1559818454-d45ecb9c403a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fGJlZXIlMjBwZXJzb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "New pick-up today.", receiverId: 7, senderId: 3, imgUrl: "https://images.unsplash.com/photo-1600366060302-9fb7682b062b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fGJlZXIlMjBwZXJzb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" },
      { createdAt: faker.date.recent(), status: 'recipientClaimed', comment: "YESSSS", receiverId: 8, senderId: 4, imgUrl: "https://images.unsplash.com/photo-1569937755861-22f34e3ce88f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fGJlZXIlMjBwZXJzb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rounds', null, {});
  }
};
