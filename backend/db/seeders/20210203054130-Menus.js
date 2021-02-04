'use strict';

const fakeMenu = (numSites, numItems) => {
  const fakeMenuArray= [];
  const itemsPerSite = Math.floor(numItems/numSites)
  let itemsPerMenu
  while ( numSites > 0){
    itemsPerMenu = itemsPerSite
    while ( itemsPerMenu > 0){
      fakeMenuArray.push({itemId: itemsPerMenu, siteId: numSites})
      itemsPerMenu -= 1
    }
    numSites -= 1
  }
  return fakeMenuArray;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Menus', [...fakeMenu(300, 2700)
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Menus', null, {});
  }
};
