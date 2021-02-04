'use strict';

const fakeOwnerGenerator = (num) => {
  const fakeOwners = []
  while (num > 0) {
    fakeOwners.push({
      userId: Math.ceil(num/2),
      siteId: num
    })
    num -= 1
  }
  return fakeOwners;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Owners', [
        ...fakeOwnerGenerator(300)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Owners', null, {});
  
  }
};
