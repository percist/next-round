'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Sites', [
        { 
          name: `Stems and Skins`,
          address: "1056 E Montague Ave",
          city: "North Charleston",
          state: "SC",
          zip: 29405,
          website: 'https://www.accentonwinepc.com',
          imgUrl: 'https://static.spotapps.co/spots/04/eb0940bf5f11e7b09ee7a22877fee1/full',
          active: true,
          menuId: 1
         },
        { 
          name: `Accent On Wine`,
          address: "1070 E Montague Ave",
          city: "North Charleston",
          state: "SC",
          zip: 29405,
          website: 'https://www.stemsandskins.com',
          imgUrl: 'https://cdn.shopify.com/s/files/1/0323/9283/9299/files/DSC01130_480x480.jpg?v=1585859221',
          active: true,
          menuId: 2
         },
        { 
          name: `CommonHouse Aleworks`,
          address: "4831 O'Hear Ave",
          city: "North Charleston",
          state: "SC",
          zip: 29405,
          website: 'commonhousealeworks.com',
          imgUrl: 'https://cdn.shopify.com/s/files/1/0365/4097/3101/files/IMG_5689.jpg?v=1584364823',
          active: true,
          menuId: 3
         },
        { 
          name: `Dig in the Park`,
          address: "1049 E Montague Ave",
          city: "North Charleston",
          state: "SC",
          zip: 29405,
          website: 'dighospitality.com',
          imgUrl: 'https://digitalmarketing.blob.core.windows.net/11629/images/items/image584273.gif',
          active: true,
          menuId: 4
         },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Sites', null, {});
  }
};
