'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('monitoring_roadmap_influencer', 'comment', {
      type: Sequelize.STRING,
      allowNull: true,
      after: "path"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('monitoring_roadmap_influencer', 'comment');
  }
};
