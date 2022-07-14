'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_information_influencer', 'following', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: "audience",
      defaultValue: 0
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_information_influencer', 'following');
  }
};
