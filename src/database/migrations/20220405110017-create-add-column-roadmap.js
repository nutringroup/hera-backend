'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('monitoring_roadmap_influencer', 'is_roadmap', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      after: "comment",
      defaultValue: false
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('monitoring_roadmap_influencer', 'is_roadmap');
  }
};
