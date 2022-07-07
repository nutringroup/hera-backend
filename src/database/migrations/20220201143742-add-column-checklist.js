'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('prospection_checklist_social_influencer', 'segment_exclusive_value', {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false,
      after: "segment_exclusive"
  });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prospection_checklist_social_influencer', 'segment_exclusive_value');
  }
};
