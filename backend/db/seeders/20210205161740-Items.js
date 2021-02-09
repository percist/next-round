'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Items', [
        { name: 'Beer 1', price: 733, imgUrl:`https://images.unsplash.com/photo-1587582816472-81e94768469a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` , description: "So good!" },
        { name: 'Beer 2', price: 733, imgUrl: `https://images.unsplash.com/photo-1518176258769-f227c798150e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Pretty good" },
        { name: 'Beer 3', price: 733, imgUrl: `https://images.unsplash.com/photo-1527604513203-59bf6147d70f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Light" },
        { name: 'Beer 4', price: 733, imgUrl: `https://images.unsplash.com/photo-1528806461183-105a1e845da3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Crisp" },
        { name: 'Beer 5', price: 733, imgUrl: `https://images.unsplash.com/photo-1501406538164-8dfdc80aa947?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Hoppy" },
        { name: 'Beer 6', price: 733, imgUrl: `https://images.unsplash.com/photo-1599586890206-8b47d4ce96e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Quality" },
        { name: 'Beer 7', price: 733, imgUrl: `https://images.unsplash.com/photo-1559019850-a68c99bb7a1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Very Good" },
        { name: 'Beer 8', price: 733, imgUrl: `https://images.unsplash.com/photo-1593807530617-7aa58e261260?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Delicious" },
        { name: 'Beer 9', price: 733, imgUrl: `https://images.unsplash.com/photo-1567291612096-635b1896679a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "So Good" },
        { name: 'Beer 10', price: 695, imgUrl: null, description: "Really good" },
        { name: 'Beer 11', price: 695, imgUrl: null, description: "Crisp" },
        { name: 'Beer 12', price: 695, imgUrl: null, description: "So Hoppy" },
        { name: 'Beer 13', price: 695, imgUrl: null, description: "This one is good" },
        { name: 'Beer 14', price: 695, imgUrl: null, description: "Light" },
        { name: 'Beer 15', price: 695, imgUrl: null, description: "LowCal" },
        { name: 'Beer 16', price: 695, imgUrl: null, description: "Dark" },
        { name: 'Beer 17', price: 695, imgUrl: null, description: "Rich " },
        { name: 'Beer 18', price: 695, imgUrl: null, description: "Sour" },
        { name: 'Beer 19', price: 695, imgUrl: null, description: "Red" },
        { name: 'Beer 20', price: 695, imgUrl: null, description: "Pretty good" },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Items', null, {});
  }
};
