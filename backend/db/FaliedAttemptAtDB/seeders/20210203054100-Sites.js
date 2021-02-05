'use strict';
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {

    function fakeSiteGenerator(num) {
      const fakeSites = []
      while ( num > 0 ){
        const state = faker.address.stateAbbr()
        const newFakeSite = {
          name: `The ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          state: state,
          zip: faker.address.zipCode("#####"),
          website: faker.internet.url(),
          imgUrl: faker.image.business(),
          // menuId: num
        }
        console.log(newFakeSite, num)
        fakeSites.push (newFakeSite)
        num -= 1
      }
      return fakeSites;
    }

    return queryInterface.bulkInsert('Sites', [
      {
        name: `Stems and Skins`,
        address: "1070 E Montague Ave",
        city: "North Charleston",
        state: "SC",
        zip: 29405,
        website: 'https://www.stemsandskins.com',
        imgUrl: 'https://static.spotapps.co/spots/04/eb0940bf5f11e7b09ee7a22877fee1/full',
        active: true,
        menuId: 1
      },
      ...fakeSiteGenerator(300)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Sites', null, {});
  }
};
