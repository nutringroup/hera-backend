'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('additive_term_prospection_influencer', 'observation', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "description",
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('additive_term_prospection_influencer', 'observation');
  }
};
