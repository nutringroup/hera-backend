'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('prospection_contract_influencer', 'url_contract', {
      type: Sequelize.STRING,
      allowNull: true
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('prospection_information_influencer', 'url_contract',{
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
