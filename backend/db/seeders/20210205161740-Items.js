'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Items', [
        { name: '5 Paddles Brewing Home Sweet Home', price: 733, imgUrl:`https://images.unsplash.com/photo-1587582816472-81e94768469a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60` , description: "So good!" },
        { name: "All or Nothing Think Big'Ger Cream Ale", price: 733, imgUrl: `https://images.unsplash.com/photo-1518176258769-f227c798150e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Pretty good" },
        { name: 'Amsterdam Boneshaker', price: 733, imgUrl: `https://images.unsplash.com/photo-1527604513203-59bf6147d70f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Light" },
        { name: 'Ace Hill Winter Radler', price: 733, imgUrl: `https://images.unsplash.com/photo-1528806461183-105a1e845da3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Crisp" },
        { name: 'Aria Ipa', price: 733, imgUrl: `https://images.unsplash.com/photo-1501406538164-8dfdc80aa947?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Hoppy" },
        { name: "Beau's Davids Tea London Fog", price: 733, imgUrl: `https://images.unsplash.com/photo-1599586890206-8b47d4ce96e3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Y3JhZnQlMjBiZWVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Quality" },
        { name: 'Beach Day Every Day Fruit Punch', price: 733, imgUrl: `https://images.unsplash.com/photo-1559019850-a68c99bb7a1d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Very Good" },
        { name: "Beau's Lug Tread 2.5%", price: 733, imgUrl: `https://images.unsplash.com/photo-1593807530617-7aa58e261260?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "Delicious" },
        { name: 'Belhaven Brewery Merry Craftmas', price: 733, imgUrl: `https://images.unsplash.com/photo-1567291612096-635b1896679a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60`, description: "So Good" },
        { name: 'Bench Brewing Cherry Grove Sour', price: 695, imgUrl: null, description: "Really good" },
        { name: 'Berry White Raspberry Wheat', price: 695, imgUrl: null, description: "Crisp" },
        { name: 'Beswick Lager', price: 695, imgUrl: null, description: "So Hoppy" },
        { name: 'Bicycle Craft Brewery Frequency APA', price: 695, imgUrl: null, description: "This one is good" },
        { name: 'Big Rock Bow Valley Lager', price: 695, imgUrl: null, description: "Light" },
        { name: 'Birra Castello	Birra Dell', price: 695, imgUrl: null, description: "LowCal" },
        { name: 'Black Oak 10 Bitter Years Imperial Ipa', price: 695, imgUrl: null, description: "Dark" },
        { name: 'Brewdog Punk IPA', price: 695, imgUrl: null, description: "Rich " },
        { name: 'Brasserie De Blaugies La Moneuse Saison', price: 695, imgUrl: null, description: "Sour" },
        { name: 'Brock Street Blonde', price: 695, imgUrl: null, description: "Red" },
        { name: 'Buzz Hemp Beer', price: 695, imgUrl: null, description: "Pretty good" },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Items', null, {});
  }
};
