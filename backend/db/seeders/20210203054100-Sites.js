'use strict';
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {

    function fakeSiteGenerator(num) {
      const fakeUsers = []
      while ( num > 0 ){
        const state = faker.address.stateAbbr()
        fakeUsers.push (
          {
            name: `The ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            state: state,
            zip: faker.address.zipCodeByState(state),
            website: faker.internet.url(),
            imgUrl: faker.image.business(),
          }
        )
        num -= 1
      }
      return fakeUsers;
    }

    return queryInterface.bulkInsert('People', [
      {
        name: `Stems and Skins`,
        address: "1070 E Montague Ave",
        city: "North Charleston",
        state: "SC",
        zip: 29405,
        website: 'https://www.stemsandskins.com',
        imgUrl: 'https://static.spotapps.co/spots/04/eb0940bf5f11e7b09ee7a22877fee1/full',
        active: true,
      },
      ...fakeSiteGenerator(20)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('People', null, {});
  }
};
