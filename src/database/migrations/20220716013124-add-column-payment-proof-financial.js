'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_financial_influencer', 'payment_proof', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "nf_file"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_financial_influencer', 'payment_proof');
  }
};
