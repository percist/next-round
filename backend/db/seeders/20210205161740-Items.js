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
        { name: 'Bench Brewing Cherry Grove Sour', price: 695, imgUrl: "https://images.unsplash.com/photo-1573159312725-4dab0e8046f3?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "Really good" },
        { name: 'Berry White Raspberry Wheat', price: 695, imgUrl: "https://images.unsplash.com/photo-1558882262-d5cc31cbc2ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80", description: "Crisp" },
        { name: 'Beswick Lager', price: 695, imgUrl: "https://images.unsplash.com/photo-1532377611310-4564e426e7c1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8&auto=format&fit=crop&w=400&q=60", description: "So Hoppy" },
        { name: 'Bicycle Craft Brewery Frequency APA', price: 695, imgUrl: "https://images.unsplash.com/photo-1532634726-8b9fb99845fd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8&auto=format&fit=crop&w=400&q=60", description: "This one is good" },
        { name: 'Big Rock Bow Valley Lager', price: 695, imgUrl: "https://images.unsplash.com/photo-1558882262-da718297dc55?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8&auto=format&fit=crop&w=400&q=60", description: "Light" },
        { name: 'Birra Castello	Birra Dell', price: 695, imgUrl: "https://images.unsplash.com/photo-1594170231759-e39e5dd11b7f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTd8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "LowCal" },
        { name: 'Black Oak 10 Bitter Years Imperial Ipa', price: 695, imgUrl: "https://images.unsplash.com/photo-1553190249-6edf8cf1037e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nzh8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "Dark" },
        { name: 'Brewdog Punk IPA', price: 695, imgUrl: "https://images.unsplash.com/photo-1579106391617-bf9edae36907?ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODd8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "Rich " },
        { name: 'Brasserie De Blaugies La Moneuse Saison', price: 695, imgUrl: "https://images.unsplash.com/photo-1534534110269-583d430e0038?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTZ8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "Sour" },
        { name: 'Brock Street Blonde', price: 695, imgUrl: "https://images.unsplash.com/photo-1596090972033-ab8a06abf834?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTd8fGNyYWZ0JTIwYmVlcnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "Red" },
        { name: 'Buzz Hemp Beer', price: 695, imgUrl: "https://images.unsplash.com/photo-1606596946068-43858794781f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTA1fHxjcmFmdCUyMGJlZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", description: "Pretty good" },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Items', null, {});
  }
};
