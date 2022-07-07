'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_information_influencer', 'cel', {
      type: Sequelize.STRING,
      allowNull: false,
      after: "audience"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_information_influencer', 'cel');
  }
};
