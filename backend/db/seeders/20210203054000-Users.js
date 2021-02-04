'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    function fakeUserGenerator(num) {
      const fakeUsers = []
      while ( num > 0 ){
        fakeUsers.push (
          {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            zip: faker.address.zipCode("#####"),
            imgUrl: faker.image.people(),
            hashedPassword: bcrypt.hashSync(faker.internet.password()),
          }
        )
        num -= 1
      }
      return fakeUsers;
    }

    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'User',
        zip: 29405,
        imgUrl: null,
        hashedPassword: bcrypt.hashSync('password'),
      }, ...fakeUserGenerator(1000)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
