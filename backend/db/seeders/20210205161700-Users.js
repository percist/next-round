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
    { username: 'DemoUser', firstName: "Demo", lastName: "User", zip: "29405", email: 'demo@user.io', imgUrl: " https://www.placecage.com/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placebeard.it/640x480", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/c/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.placecage.com/g/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.fillmurray.com/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.fillmurray.com/g/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placeimg.com/640/480/people/45", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placebeard.it/640x480", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/c/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/g/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.fillmurray.com/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.fillmurray.com/g/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placebeard.it/640x480", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/c/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.placecage.com/g/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.fillmurray.com/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.fillmurray.com/g/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placeimg.com/640/480/people/45", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placebeard.it/640x480", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/c/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/g/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.fillmurray.com/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.fillmurray.com/g/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placebeard.it/640x480", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/c/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.placecage.com/g/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.fillmurray.com/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: " https://www.fillmurray.com/g/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placeimg.com/640/480/people/45", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  http://placebeard.it/640x480", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/c/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.placecage.com/g/200/300", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.fillmurray.com/300/200", hashedPassword: bcrypt.hashSync('password')}, 
    { username: faker.internet.userName(), firstName: faker.name.firstName(), lastName: faker.name.lastName(), zip: faker.address.zipCode("#####"), email: faker.internet.email(), imgUrl: "  https://www.fillmurray.com/g/300/200", hashedPassword: bcrypt.hashSync('password')},  
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
