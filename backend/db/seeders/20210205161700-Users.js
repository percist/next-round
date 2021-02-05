'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');


function fakeUserGenerator(num) {
  const fakeUsers = []
  while ( num > 0 ){
    const newFakeUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      zip: faker.address.zipCode("#####"),
      imgUrl: faker.image.people(),
      hashedPassword: bcrypt.hashSync('password'),
    }
    fakeUsers.push (newFakeUser)
    num -= 1
  }
  return fakeUsers;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    { username: 'DemoUser', firstName: "Demo", lastName: "User", zip: "29405", email: 'demo@user.io', imgUrl: "http://www.thispersondoesnotexist.com", hashedPassword: bcrypt.hashSync('password')}, 
    ...fakeUserGenerator(100)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
