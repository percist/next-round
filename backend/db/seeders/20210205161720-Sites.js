'use strict';
const faker = require('faker');

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
        updatedAt: faker.date.recent(), 
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
        updatedAt: faker.date.recent(), 
      },
      {
        name: `CommonHouse Aleworks`,
        address: "4831 O'Hear Ave",
        city: "North Charleston",
        state: "SC",
        zip: 29405,
        website: 'https://www.commonhousealeworks.com',
        imgUrl: 'https://cdn.shopify.com/s/files/1/0365/4097/3101/files/IMG_5689.jpg?v=1584364823',
        active: true,
        updatedAt: faker.date.recent(), 
      },
      {
        name: `Dig in the Park`,
        address: "1049 E Montague Ave",
        city: "North Charleston",
        state: "SC",
        zip: 29405,
        website: 'https://www.dighospitality.com',
        imgUrl: 'https://digitalmarketing.blob.core.windows.net/11629/images/items/image584273.gif',
        active: true,
        updatedAt: faker.date.recent(), 
      },
      {
        name: `Madra Rua`,
        address: "1034 E Montague Ave",
        city: "North Charleston",
        state: "SC",
        zip: 29405,
        website: 'https://www.madraruapub.com',
        imgUrl: 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/1925230_630940913718938_1019459995444865422_n.jpg?_nc_cat=110&ccb=3&_nc_sid=09cbfe&_nc_ohc=07--SoHC1EoAX_ADsbm&_nc_ht=scontent-mia3-2.xx&oh=440bc3e14e2e898a6adb0d00369ca3ee&oe=604C6F8E',
        active: true,
        updatedAt: faker.date.recent(), 
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sites', null, {});
  }
};
