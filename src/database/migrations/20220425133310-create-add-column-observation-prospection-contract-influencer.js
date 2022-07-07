'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_contract_influencer', 'observation', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "url_contract"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_contract_influencer', 'observation');
  }
};
