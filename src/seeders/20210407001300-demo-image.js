'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {url: 'https://netivooregon.s3.amazonaws.com/attach/modelo/20210402/2000/76201894.jpg', id_product: 1, created_at: new Date()},
      {url: 'https://netivooregon.s3.amazonaws.com/attach/modelo/20210402/2000/85063480.jpg', id_product: 1, created_at: new Date()},
        
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});

  }
};
